import React from 'react';

class Node extends React.Component {
    _mouseDownHandler(e) {
        this.props.startDrag(e, this.props.data);
    }
    _mouseUpHandler() {
        this.props.stopDrag();
    }
    render() {
        return (
            <div
                className="node"
                style = {{
                    left: this.props.data.left,
                    top: this.props.data.top
                }}
                onMouseDown={::this._mouseDownHandler}
                onMouseUp={::this._mouseUpHandler}
            >
            </div>
        )
    }
}

export default Node;
