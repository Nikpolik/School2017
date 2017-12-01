//store was getting big so i moved it here
import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import { State } from './interfaces';
import createHistory from 'history/createBrowserHistory'
import * as notificationsActions from './actions/helpers/notifications.actions';


import * as idleMonitor from './components/idle-monitor';
import appReducer from './reducers/reducer';

const history = createHistory();
const middleware = routerMiddleware(history);


const store: Store<State> = createStore(
    combineReducers({
      app: appReducer,    
      router: routerReducer,
      idle: idleMonitor.reducer
    }),
    composeWithDevTools(applyMiddleware(middleware, thunk, idleMonitor.middleware))
  );
  
  let oldUser: string = '';
  store.subscribe(() => {
    const state: State = store.getState();
    let currentUser = state.app.user.name;
    if(currentUser !== oldUser &&  currentUser !== '') {
        oldUser = currentUser;     
        store.dispatch(notificationsActions.addNotification('Started checking inactivity'));   
        store.dispatch(idleMonitor.actions.start());
    } else if (currentUser !== oldUser) {
        oldUser = currentUser;        
        store.dispatch(notificationsActions.addNotification('Stoped checking inactivity'));           
        store.dispatch(idleMonitor.actions.stop);
    }
    localStorage.setItem('refreshToken', state.app.user.refreshToken);
    localStorage.setItem('name', state.app.user.name);    
  });

  export { store, history };