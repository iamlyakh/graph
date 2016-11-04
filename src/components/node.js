import React from 'react';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false
        }
    }
    _mouseDownHandler(e) {
        this.props.startDrag(e, this.props.node.id);
        this.setState({
            dragging: true
        });
    }
    _mouseUpHandler(e) {
        this.props.stopDrag();
        this.setState({
            dragging: false
        });

		const nodeId = this.props.node.id;

		if (e.altKey) {
			this.props.insertNode(nodeId);
		}

		if (e.ctrlKey) {
			this.props.deleteNodeHard(nodeId);
		}

		if (e.shiftKey) {
			this.props.deleteNodeSoft(nodeId);
		}
    }
	getColor() {
		const count = this.props.colors.length;
		const level = this.props.node.level;

		return this.props.colors[level % count];
	}
    render() {
        return (
            <div
                className={'node ' + (this.state.dragging ? 'node_dragging' : '')}
                style = {{
                    left: this.props.node.left,
                    top: this.props.node.top,
					background: this.getColor()
                }}
                onMouseDown={::this._mouseDownHandler}
                onMouseUp={::this._mouseUpHandler}
            >
                {
                    this.props.node.name || this.props.node.id
                }
            </div>
        )
    }
}

export default Node;
