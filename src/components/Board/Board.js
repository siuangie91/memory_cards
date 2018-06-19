import React from 'react';

import Timer from '../Timer/Timer';

import styles from './Board.scss';

class Board extends React.Component {
	constructor() {
		super();

		this.flipCard = this.flipCard.bind(this);
	}

	flipCard() {
		console.log('flip');
	}

	render() {
		const deck = this.props.deck;

		return (
			<div className={styles.board}>
				{
					deck.map((card, i) => {
						return (
							<div key={i} 
								className={`${styles.card} ${styles.facedown}`}
								onClick={(e) => { 
									const thisCard = e.target;

									thisCard.classList.remove(styles.facedown);	
								}}>
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