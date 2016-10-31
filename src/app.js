import React from 'react';
import ReactDOM from 'react-dom';
import GraphComponent from './components/graph';
import Graph from './graph';
import nodes from './db';

const graph = new Graph();
graph.insertNode(1, 'node1');
graph.insertNode(2, 'node2');
graph.insertNode(2, 'node3');
graph.insertNode(2, 'node4');
graph.insertNode(1, 'node5');

console.log(graph);

ReactDOM.render(<GraphComponent graph={graph} />, document.getElementById('app'));