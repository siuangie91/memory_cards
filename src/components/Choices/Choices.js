import React from 'react';

import styles from './Choices.scss';

class Choices extends React.Component {
	render() {
		const btn1Classes = (this.props.hasOwnProperty('btn1Classes')) ? this.props.btn1Classes : "";
		const btn2Classes = (this.props.hasOwnProperty('btn2Classes')) ? this.props.btn2Classes : "";

		return (
			<div className={styles.choices}>
		    <p>{this.props.text}</p>	
		    <button className={`btn ${btn1Classes}`} onClick={() => this.props.clickHandler('easy')}>{this.props.btn1Text}</button>
		    <button className={`btn ${btn2Classes}`} onClick={() => this.props.clickHandler('hard')}>{this.props.btn2Text}</button>
			</div>
		);
	}
}

export default Choices;