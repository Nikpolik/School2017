import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import NavBar from './components/navigation/navbar.component';
import Routes from './routes';

import appReducer from './reducers/reducer';

import { State } from './interfaces';

import NavBarContainer from './containers/navigation/navbar.container';

const history = createHistory();
const middleware = routerMiddleware(history);


const store: Store<State> = createStore(
  combineReducers({
    app: appReducer,    
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, thunk))
);

store.subscribe(() => {
  console.log('saving state');
  const state = store.getState();
  localStorage.setItem('user', state.app.user.token);
  localStorage.setItem('name', state.app.user.name);    
});

const App: React.StatelessComponent = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBarContainer/>
        <Routes/>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

export { store };