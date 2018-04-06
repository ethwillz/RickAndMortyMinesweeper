import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board size={8} style={{'max-width': '100%'}}/>, document.getElementById('root'));
registerServiceWorker();
