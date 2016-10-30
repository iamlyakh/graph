import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph';
import nodes from './db';

ReactDOM.render(<Graph nodes={nodes}/>, document.getElementById('app'));