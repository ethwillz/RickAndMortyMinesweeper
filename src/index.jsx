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
import EndGame from './containers/EndGame';
import FinalAction from './components/FinalAction';

// other files
import registerServiceWorker from './registerServiceWorker';
import board from './reducers/reducers';
import './index.css';

var firebase = require("firebase/app");
require("firebase/firestore");
//require("firebase/functions");

var config = {
  apiKey: "AIzaSyDexOFDISJ2lpxLSKCCZ0JHXEUuDT_0bWQ",
  authDomain: "rick-and-morty-minesweeper.firebaseapp.com",
  databaseURL: "https://rick-and-morty-minesweeper.firebaseio.com",
  projectId: "rick-and-morty-minesweeper",
  storageBucket: "rick-and-morty-minesweeper.appspot.com",
  messagingSenderId: "1089615583862"
};
firebase.initializeApp(config);

const history = createHistory();
const middleware = routerMiddleware(history);
let store = createStore(board, applyMiddleware(middleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={DifficultySelection}/>
        <Route path="/play" component={Board}/>
        <Route path="/end/:res" component={EndGame} />
        <Route path="/test/fa" component={FinalAction} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
