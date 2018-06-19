import React from 'react';

import Timer from '../Timer/Timer';
import RestartBtn from '../RestartBtn/RestartBtn';
import Card from '../Card/Card';

import timerStyles from '../Timer/Timer.scss';
import cardStyles from '../Card/Card.scss';
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
		thisCard.classList.add(`${cardStyles.flip}`);

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
			card1.classList.add(`${cardStyles.matched}`);
			card2.classList.add(`${cardStyles.matched}`);

			this.setState(prevState => {
				return {
					numFoundPairs: prevState.numFoundPairs + 1
				}
			}, () => { // when done setting state
				// remove the blocker
				this.removeBlocker();

				// check if all matched
				if(this.state.numFoundPairs === this.state.numPairs) {
					const timer = document.querySelector(`.${timerStyles.timer}`);
					const finalTime = timer.innerHTML;

					this.setState({
						timerOn: false,
						finalTime: finalTime
					});
				}
			});
		} 
		else { // if not match
			// do a little dance
			card1.classList.add(`${cardStyles.wrong}`);
			card2.classList.add(`${cardStyles.wrong}`);

			setTimeout(() => { // flip everything that's not already matched back facedown
				// remove the blocker
				this.removeBlocker();

				const theCards = document.querySelectorAll(`.${cardStyles.card}:not(.${cardStyles.matched})`);
				[].forEach.call(theCards, (elem) => {
					if(elem.classList.contains(`${cardStyles.flip}`)) {
						elem.classList.remove(`${cardStyles.flip}`)
					}
				});

				card1.classList.remove(`${cardStyles.wrong}`);
				card2.classList.remove(`${cardStyles.wrong}`);
			}, 1600);
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
			return `${mins} min, ${secs} sec`;
		} 
		else {
			return `${secs} sec`;
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
									<Card key={i}
										value={card}
										color={this.props.deckColor}
										clickHandler={e => this.flipCard(e.currentTarget)}/>	
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