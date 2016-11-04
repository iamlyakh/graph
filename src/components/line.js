import React from 'react';

export default class Line extends React.Component {
	getLength() {
		const x1 = this.props.from.left;
		const x2 = this.props.to.left;
		const y1 = this.props.from.top;
		const y2 = this.props.to.top;

		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	getAngle() {
		const x1 = this.props.from.left;
		const x2 = this.props.to.left;
		const y1 = this.props.from.top;
		const y2 = this.props.to.top;

		const y = y2 - y1;
		const x = x2 - x1;
		const angle = Math.atan(x / y);

		return y2 >= y1 ? Math.PI/2 - angle : Math.PI*3/2 - angle;
	}

	getStyles() {
		const x1 = this.props.from.left;
		const y1 = this.props.from.top;
		const length = this.getLength();
		const angle = this.getAngle();

		return {
			width: length,
			left: x1 + 25,
			top: y1 + 25,
			transform: `rotate(${angle}rad)`
		}
	}

	render() {
		return (
			<div
				className="line"
				style={
					this.getStyles()
				}
			>
			</div>
		)
	}
}