import React from 'react';
import fetch from 'isomorphic-fetch';

import Board from '../Board/Board';
import Choices from '../Choices/Choices';

import choicesStyles from '../Choices/Choices.scss';
import styles from './Game.scss';

const VIEWS = {
	INIT: 'init',
	CHOOSE_DIFFICULTY: 'choose',
	PLAY: 'play'
}

class Game extends React.Component {
	constructor() {
		super();

		this.state = {
			view: VIEWS.INIT,
			deck: [],
			deckColor: ""			
		};

		this.fetchCards = this.fetchCards.bind(this);
		this.restartGame = this.restartGame.bind(this);
		this.setCardStyle = this.setCardStyle.bind(this);
	}

	setCardStyle(color) {
		this.setState({ 
			deckColor: color,
			view: VIEWS.CHOOSE_DIFFICULTY
		});
	}

	fetchCards(level) {
		fetch('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json', { method: 'GET'})
			.then(response => response.json())
			.then(json => {
				// shuffled the deck using Fisher-Yates Shuffle (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
				const deck = shuffle(json.levels.find(item => item.difficulty === level).cards); // grab only the deck that was selected
				
				function shuffle(array) {
				  var currentIndex = array.length, temporaryValue, randomIndex;

				  while (currentIndex !== 0) {
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex -= 1;
				    temporaryValue = array[currentIndex];
				    array[currentIndex] = array[randomIndex];
				    array[randomIndex] = temporaryValue;
				  }
				  return array;
				}

				this.setState({
					view: VIEWS.PLAY,
					deck: [...deck], 
				});

				// console.log(json.levels.find(item => item.difficulty === level).cards);
				// console.log(this.state);
			})
			.catch(error => {
				throw Error('No cards were found!');
			});
	}

	restartGame() {
		this.setState({
			view: VIEWS.INIT,
		})
	}

	render() {
		let theView;
		switch(this.state.view) {
			case VIEWS.CHOOSE_DIFFICULTY:
				theView = 
					<Choices 
						text="Choose a difficulty!"
						clickHandler={this.fetchCards}
						btn1Text="easy"
						btn2Text="hard"/>
				break;
			case VIEWS.PLAY:
				theView =
					<Board 
	    			deck={this.state.deck}
	    			deckColor={this.state.deckColor}
	    			restart={this.restartGame}/>	
				break;
			case VIEWS.INIT:
			default:
				theView =
					<Choices 
						text="Choose a card color!"
						clickHandler={this.setCardStyle}
						btn1Classes={choicesStyles.red}
						btn2Classes={choicesStyles.blue}
						btn1Text="red"
						btn2Text="blue"/>
				break;
		}

		return (
			<div className={styles.game}>
		    <h1 className={styles.header}>NYT Memory Game!</h1>
		    
				{theView}
		  </div>
		);
	}
}

export default Game;
