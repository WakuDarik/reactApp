import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import { reducer as formReducer } from 'redux-form';
import contestReducer from './contest-reducer';
import profileReducer from './profile-reducer';

const { createStore, combineReducers, applyMiddleware } = require("redux");

let reduserBox = combineReducers({
    auth: authReducer,
    contest: contestReducer,
    profile: profileReducer,
    form: formReducer,
});

let store = createStore(reduserBox, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;