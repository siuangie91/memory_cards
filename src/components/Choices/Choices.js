import React from 'react';

import styles from './Choices.scss';

const Choices = (props) => {
	const btn1Classes = (props.hasOwnProperty('btn1Classes')) ? props.btn1Classes : "";
	const btn2Classes = (props.hasOwnProperty('btn2Classes')) ? props.btn2Classes : "";

	return (
		<div className={styles.choices}>
	    <p>{props.text}</p>	
	    <button className={`btn ${btn1Classes}`} onClick={() => props.clickHandler(props.btn1Text)}>{props.btn1Text}</button>
	    <button className={`btn ${btn2Classes}`} onClick={() => props.clickHandler(props.btn2Text)}>{props.btn2Text}</button>
		</div>
	);
};

export default Choices;