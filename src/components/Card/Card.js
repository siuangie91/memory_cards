import React from 'react';

import styles from './Card.scss'

const Card = (props) => (
	<div value={props.value}
		className={styles.card}
		onClick={props.clickHandler}>

		<div className={styles.cardflipper}>
			<div className={`${styles.cardside} ${styles.cardback} ${styles[props.color]}`}></div>

			<div className={`${styles.cardside} ${styles.cardface} ${styles[props.color]}`}>
				<span>{props.value}</span>
			</div>
		</div>

	</div>
);

export default Card;