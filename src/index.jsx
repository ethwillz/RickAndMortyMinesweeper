// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

// components
import DifficultySelection from './containers/DifficultySelection';
import Board from './containers/Board';

// other files
import registerServiceWorker from './registerServiceWorker';
import board from './reducers/reducers';
import './index.css';
import win from './images/win.gif';
import loss from './images/loss.gif';

const history = createHistory();
const middleware = routerMiddleware(history);
let store = createStore(board, applyMiddleware(middleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={DifficultySelection}/>
        <Route path="/play" component={Board}/>
        <Route path="/win" component={() => <img style={{width: '100vw', height: '100vh'}} src={win} alt='bs'/>} />
        <Route path="/loss" component={() => <img style={{width: '100vw', height: '100vh'}} src={loss} alt='bs'/>} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
