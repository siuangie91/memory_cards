import React from 'react';

import Timer from '../Timer/Timer';
import timerStyles from '../Timer/Timer.scss';

import RestartBtn from '../RestartBtn/RestartBtn';

import styles from './Board.scss';

class Board extends React.Component {
	constructor(props) {
		super(props);

		const deck = this.props.deck;

		this.state = {
			timerOn: false,
			numPairs: deck.length / 2,
			numFlipped: 0,
			currPair: [],
			numFoundPairs: 0,
			pristine: true, 
			finalTime: ""
		}

		this.flipCard = this.flipCard.bind(this);
		this.showFinalTime = this.showFinalTime.bind(this);
	}

	flipCard(thisCard) {
		// flip the card
		thisCard.classList.remove(styles.facedown);

		// if this is the first flip, set timer on
		if(this.state.pristine) {
			this.setState({ 
				timerOn: true,
				pristine: false 
			});			
		}

		this.setState(prevState => {
			return {
				numFlipped: prevState.numFlipped + 1,
				currPair: [...prevState.currPair, thisCard]
			}
		}, () => { // callback function
			if(this.state.numFlipped == 2) {
				// open the blocker to prevent interaction with cards while setting state
				document.querySelector(`.${styles.blocker}`).classList.add(`${styles.open}`);

				this.checkMatch();
			} 
		});
	}

	checkMatch() {
		const card1 = this.state.currPair[0];
		const card2 = this.state.currPair[1];		

		if(card1.getAttribute('value') === card2.getAttribute('value')) { // if match
			card1.classList.add(`${styles.matched}`);
			card2.classList.add(`${styles.matched}`);

			this.setState(prevState => {
				return {
					numFoundPairs: prevState.numFoundPairs + 1
				}
			}, () => { // when done setting state
				// remove the blocker
				this.removeBlocker();
				if(this.state.numFoundPairs === this.state.numPairs) {
					const timer = document.querySelector(`.${timerStyles.timer}`);
					const finalTime = timer.innerHTML;

					this.setState({
						timerOn: false,
						finalTime: finalTime
					})

					// alert('you matched all!');
				}
			});
		} 
		else { // if not match, flip everything that's not already matched back facedown
			card1.classList.add(`${styles.wrong}`);
			card2.classList.add(`${styles.wrong}`);

			setTimeout(() => {
				// remove the blocker
				this.removeBlocker();

				const theCards = document.querySelectorAll(`.${styles.card}:not(.${styles.matched})`);
				[].forEach.call(theCards, (elem) => {
					if(!elem.classList.contains(`${styles.facedown}`)) {
						elem.classList.add(`${styles.facedown}`)
					}
				});

				card1.classList.remove(`${styles.wrong}`);
				card2.classList.remove(`${styles.wrong}`);
			}, 1200);
		}

		// empty out the state properties that are handling the "rounds"
		this.setState({
			currPair: [],
			numFlipped: 0
		});
	}

	removeBlocker() {
		document.querySelector(`.${styles.blocker}`).classList.remove(`${styles.open}`);
	}

	showFinalTime() {
		const theTime = this.state.finalTime.split(":");
		const mins = +theTime[0]; // coerce as num
		const secs = +theTime[1];

		if(mins > 0) {
			return `${mins} m, ${secs} s`;
		} 
		else {
			return `${secs} s`;
		}
	}

	render() {
		// console.log('board state', this.state);
		const deck = this.props.deck;

		return (
			<div className={styles.board_container}>
				<div className={styles.timer_container}>
					{
						(this.state.timerOn) ? 
							<Timer /> 
							: 
							<div className={styles.final_time}>
								{(this.state.finalTime) ? this.state.finalTime : "0:00"}
							</div>
					}
					<RestartBtn restart={this.props.restart}/>	
				</div>
				<div className={styles.board}>
					<div className={styles.card_container}>
						{
							deck.map((card, i) => {
								return (
									<div key={i} value={card}
										className={`${styles.card} ${styles.facedown}`}
										onClick={e => this.flipCard(e.target)}>
										<span>{card}</span>
									</div>
								)
							})
						}
					</div>
				</div>

				{
					(this.state.finalTime) ? 
						<div className={styles.finished}>
							<p>
								Congrats!<br />You finished in<br />
								<span className={styles.final_time}>{this.showFinalTime()}</span>
								<RestartBtn restart={this.props.restart}/>	
							</p>
						</div>
						: ""
				}
				<div className={styles.blocker}></div>
			</div>
		);
	}
}

export default Board;