import {createStore, combineReducers, applyMiddleware, compose} from"redux";
import thunk from 'redux-thunk';
import Post from "./modules/Post";

const  middlewares= [thunk];
const rootReducer = combineReducers({Post})
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;