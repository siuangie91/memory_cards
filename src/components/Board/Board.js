import React from 'react';

import Timer from '../Timer/Timer';

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
			pristine: true
		}

		this.flipCard = this.flipCard.bind(this);
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

		if(card1.getAttribute('value') === card2.getAttribute('value')) {
			card1.classList.add('matched');
			card2.classList.add('matched');

			this.setState(prevState => {
				return {
					numFoundPairs: prevState.numFoundPairs + 1
				}
			}, () => {
				// remove the blocker
				this.removeBlocker();
				if(this.state.numFoundPairs === this.state.numPairs) {
					alert('you matched all!');
				}
			});
		} 
		else { // if not match, flip everything that's not already matched back facedown
			setTimeout(() => {
				// remove the blocker
				this.removeBlocker();

				const theCards = document.querySelectorAll(`.${styles.card}:not(.matched)`);
				[].forEach.call(theCards, (elem) => {
					if(!elem.classList.contains(`${styles.facedown}`)) {
						elem.classList.add(`${styles.facedown}`)
					}
				});
			}, 800);
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

	render() {
		// console.log('board state', this.state);
		const deck = this.props.deck;

		return (
			<div className={styles.board_container}>
				{
					(this.state.timerOn) ? <Timer /> : ""
				}
				<div className={styles.board}>
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

				<div className={styles.blocker}></div>
			</div>
		);
	}
}

export default Board;