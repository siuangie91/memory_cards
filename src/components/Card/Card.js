import React from 'react';

import styles from './Card.scss'

class Card extends React.Component {
	render() {
		return (
			<div value={this.props.value}
				className={`${styles.card}`}
				onClick={this.props.clickHandler}>

				<div className={styles.cardflipper}>
					<div className={`${styles.cardside} ${styles.cardback}`}></div>

					<div className={`${styles.cardside} ${styles.cardface}`}>
						<span>{this.props.value}</span>
					</div>
				</div>

			</div>
		)
	}
}

export default Card;