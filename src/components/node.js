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
    _mouseUpHandler() {
        this.props.stopDrag();
        this.setState({
            dragging: false
        });
    }
    render() {
        return (
            <div
                className={'node ' + (this.state.dragging ? 'node_dragging' : '')}
                style = {{
                    left: this.props.node.left,
                    top: this.props.node.top
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
