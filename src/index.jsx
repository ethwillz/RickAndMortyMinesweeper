import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/reducers';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import DifficultySelection from './containers/DifficultySelection';
import Board from './containers/Board';

let store = createStore(combineReducers(reducers));

console.log(DifficultySelection.type);
console.log(Board.type);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DifficultySelection}/>
        <Route exact path="/play" component={Board}/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
