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
import EndGame from './components/EndGame'

// other files
import registerServiceWorker from './registerServiceWorker';
import board from './reducers/reducers';
import './index.css';

const history = createHistory();
const middleware = routerMiddleware(history);
let store = createStore(board, applyMiddleware(middleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={DifficultySelection}/>
        <Route path="/play" component={Board}/>
        <Route path="/EndGame/:res" component={EndGame} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
