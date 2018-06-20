import React from 'react';

import RestartBtn from '../RestartBtn/RestartBtn';

import styles from './Finished.scss';

// audio file
import yayAudio from '../../_assets/audio/yay.mp3';

class Finished extends React.Component {
	componentDidMount() {
		const audio = new Audio(yayAudio);
		setTimeout(() => {
			audio.play();
		}, 1200);
	}

	render() {
		return (
			<div className={styles.finished}>
				<p>
					Congrats!<br />You finished in<br />
					<span className={styles.final_time}>{this.props.text}</span>
					<RestartBtn restart={this.props.restart}/>	
				</p>
			</div>
		);
	}
}

export default Finished;