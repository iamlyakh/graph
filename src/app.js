import React from 'react';
import ReactDOM from 'react-dom';
import GraphComponent from './components/graph';
import Graph from './graph';
import colors from './colors';

const graph = new Graph();
graph.insertNode(1, '');
graph.insertNode(1, '');
graph.insertNode(3, '');
graph.insertNode(3, '');
graph.insertNode(2, '');
graph.insertNode(2, '');
graph.insertNode(2, '');
graph.insertNode(7, '');
graph.insertNode(7, '');

ReactDOM.render(<GraphComponent graph={graph} colors={colors}/>, document.getElementById('app'));