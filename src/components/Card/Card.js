import React from 'react';


class Card extends React.Component {
	render() {
		return (
			<div value={this.props.value}
				className={this.props.classes}
				onClick={this.props.clickHandler}>
				<span>{this.props.value}</span>
			</div>
		)
	}
}

export default Card;