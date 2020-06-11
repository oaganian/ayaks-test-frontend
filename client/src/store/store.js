import { createStore, combineReducers, applyMiddleware } from 'redux';
import siderReducer from './reducers/sider';
import thunkMiddleware from 'redux-thunk';
import allReducer from './reducers/all';
import newReducer from './reducers/new';
import { reducer as formReducer } from 'redux-form';


const reducers = combineReducers({
  siderReducer: siderReducer,
  allReducer: allReducer,
  newReducer: newReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;