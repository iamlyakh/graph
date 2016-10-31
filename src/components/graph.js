import React from 'react';
import Node from './node';

class GraphComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingNode: null,
            prevX: null,
            prevY: null
        };
    }

    _mouseMoveHandler(e) {
        if (this.state.draggingNode) {
            const deltaX = this.state.prevX - e.clientX;
            const deltaY = this.state.prevY - e.clientY;

            const draggingNode = this.props.graph.getNodeById(this.state.draggingNode);
            this.props.graph.setPosition(draggingNode.id, draggingNode.left - deltaX, draggingNode.top - deltaY);

            this.setState({
                prevX: e.clientX,
                prevY: e.clientY
            })
        }
    }

    startDrag(e, nodeId) {
        this.setState({
            draggingNode: nodeId,
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
                {
                    this.props.graph.nodes.map(node => {
                        return <Node
                                node={node}
                                startDrag={::this.startDrag}
                                stopDrag={::this.stopDrag}/>
                    })
                }
            </div>
        )
    }
}

export default GraphComponent;