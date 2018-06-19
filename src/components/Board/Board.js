import React from 'react';

import Timer from '../Timer/Timer';

import styles from './Board.scss';

class Board extends React.Component {
	constructor(props) {
		super(props);

		const deck = this.props.deck;

		this.state = {
			totalCards: deck.length,
			numPairs: deck.length / 2,
			numFlipped: 0,
			currPair: [],
			numFoundPairs: 0
		}

		this.flipCard = this.flipCard.bind(this);
	}

	flipCard(thisCard) {
		thisCard.classList.remove(styles.facedown);

		this.setState(prevState => {
			return {
				numFlipped: prevState.numFlipped + 1,
				currPair: [...prevState.currPair, thisCard]
			}
		}, () => { // callback function
			if(this.state.numFlipped == 2) {
				// console.log('currPair', this.state.currPair);
				this.checkMatch();

			} 
		});
	}

	checkMatch() {
		if(this.state.currPair[0].getAttribute('value') === this.state.currPair[1].getAttribute('value')) {
			const card1 = this.state.currPair[0];
			const card2 = this.state.currPair[1];

			card1.classList.add('matched');
			card2.classList.add('matched');

			this.setState(prevState => {
				return {
					numFoundPairs: prevState.numFoundPairs + 1
				}
			}, () => {
				console.log('board state', this.state);
			});
		} 
		else { // if not match, flip everything that's not already matched back facedown
			setTimeout(() => {
				const theCards = document.querySelectorAll(`.${styles.card}:not(.matched)`);
				[].forEach.call(theCards, (elem) => {
					if(!elem.classList.contains(`${styles.facedown}`)) {
						elem.classList.add(`${styles.facedown}`)
					}
				});
			}, 1000);
		}

		// empty out the state properties that are handling the "rounds"
		this.setState({
			currPair: [],
			numFlipped: 0
		});
	}

	render() {
		// console.log('board state', this.state);

		const deck = this.props.deck;

		return (
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
		);
	}
}

export default Board;