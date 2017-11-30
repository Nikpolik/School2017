import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from 'react-redux'

import { ConnectedRouter as Router } from 'react-router-redux'
import {store, history} from './configureStore';

import NavBar from './components/navigation/navbar.component';
import Routes from './routes';

import NavBarContainer from './containers/navigation/navbar.container';

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