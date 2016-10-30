import React from 'react';

class Node extends React.Component {
    _handlerMouseDown(e) {
        this.props.startDrag(e, this.props.data);
    }
    _handlerMouseUp() {
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
                onMouseDown={::this._handlerMouseDown}
                onMouseUp={::this._handlerMouseUp}
            >
            </div>
        )
    }
}

export default Node;
