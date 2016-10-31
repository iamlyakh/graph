import React from 'react';

class Node extends React.Component {
    _mouseDownHandler(e) {
        this.props.startDrag(e, this.props.node.id);
    }
    _mouseUpHandler() {
        this.props.stopDrag();
    }
    render() {
        return (
            <div
                className="node"
                style = {{
                    left: this.props.node.left,
                    top: this.props.node.top
                }}
                onMouseDown={::this._mouseDownHandler}
                onMouseUp={::this._mouseUpHandler}
            >
                {
                    this.props.node.name
                }
            </div>
        )
    }
}

export default Node;
