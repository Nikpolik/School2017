import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import NavBar from './components/navigation/navbar.component';
import Routes from './routes';

import loginReducer from './reducers/login.reducer'
import appReducer from './reducers/reducer';

const history = createHistory();
const middleware = routerMiddleware(history);


const store = createStore(
  combineReducers({
    app: appReducer,    
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, thunk))
);

const App: React.StatelessComponent = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar/>
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