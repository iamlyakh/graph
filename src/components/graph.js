import React from 'react';
import Node from './node';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingNode: null,
            prevX: null,
            prevY: null,
            nodes: [...props.nodes]
        };
    }

    _mouseMoveHandler(e) {
        if (this.state.draggingNode) {
            const deltaX = this.state.prevX - e.clientX;
            const deltaY = this.state.prevY - e.clientY;

            const nodes = this.state.nodes.map(node => {
                if (node.id = this.state.draggingNode.id) {
                    return {
                        ...node,
                        ...{
                            left: node.left - deltaX,
                            top: node.top - deltaY
                        }
                    }
                }
                return node;
            });

            this.setState({
                nodes: nodes,
                prevX: e.clientX,
                prevY: e.clientY
            })
        }
    }

    startDrag(e, node) {
        this.setState({
            draggingNode: node,
            prevX: e.clientX,
            prevY: e.clientY
        })
    }

    stopDrag() {
        this.setState({
            draggingNode: null,
            prevX: null,
            prevY: null
        })
    }

    render() {
        return (
            <div
                className="graph"
                onMouseMove={::this._mouseMoveHandler}
            >
                <Node data={this.state.nodes[0]} startDrag={::this.startDrag} stopDrag={::this.stopDrag} />
            </div>
        )
    }
}

export default Graph;