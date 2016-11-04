import React from 'react';
import Node from './node';
import Line from './line';

class GraphComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingNodeId: null,
            prevX: null,
            prevY: null
        };
    }

    _mouseMoveHandler(e) {
        if (this.state.draggingNodeId) {
            const deltaX = this.state.prevX - e.clientX;
            const deltaY = this.state.prevY - e.clientY;

            const draggingNode = this.props.graph.getNodeById(this.state.draggingNodeId);
            this.props.graph.setPosition(draggingNode.id, draggingNode.left - deltaX, draggingNode.top - deltaY);

            this.setState({
                prevX: e.clientX,
                prevY: e.clientY
            })
        }
    }

    startDrag(e, nodeId) {
        this.setState({
            draggingNodeId: nodeId,
            prevX: e.clientX,
            prevY: e.clientY
        })
    }

    stopDrag() {
        this.setState({
            draggingNodeId: null,
            prevX: null,
            prevY: null
        })
    }

    renderLines(node) {
        let lines = [];

        node.children.forEach(childId => {
            lines.push(<Line key={'' + node.id + childId} from={node} to={this.props.graph.getNodeById(childId)}/>);
        });

        return lines;
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
                                key={node.id}
                                node={node}
                                startDrag={::this.startDrag}
                                stopDrag={::this.stopDrag}
                                colors={this.props.colors}
                        />
                    })
                }

                {
                    this.props.graph.nodes.map(node => {
                        return this.renderLines(node)
                    })
                }

            </div>
        )
    }
}

export default GraphComponent;