import React from 'react';
import fetch from 'isomorphic-fetch';

import styles from './Game.scss';

import Board from '../Board/Board';

const VIEWS = {
	INIT: 'init',
	PLAY: 'play'
}

class Game extends React.Component {
	constructor() {
		super();

		this.state = {
			view: VIEWS.INIT,
			deck: []			
		};

		this.fetchCards = this.fetchCards.bind(this);
	}

	fetchCards(level) {
		fetch('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json', { method: 'GET'})
			.then(response => response.json())
			.then(json => {
				// console.log('json', json);

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
			});
	}



	render() {
		return (
			<div>
		    <h1 className={styles.header}>NYT Memory Game!</h1>
		    {/*<Timer />*/}
		    
		    {
		    	(this.state.view === VIEWS.INIT) ? 
	    			<div>
	    				<div className={styles.placeholder}>Let the games begin (here).</div>
	    				<div>
					    	<p>Choose a difficulty!</p>	
					    	<button onClick={() => this.fetchCards('easy')}>Easy</button>	
					    	{' '}
					    	<button onClick={() => this.fetchCards('hard')}>Hard</button>
					    </div>
	    			</div>
	    			: ""
		    }

		    {
		    	(this.state.view === VIEWS.PLAY) ? 
		    		<Board deck={this.state.deck}/>
		    		: ""
		    }

		    
		  </div>
		);
	}
}




export default Game
