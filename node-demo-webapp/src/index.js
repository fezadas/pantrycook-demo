import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
//import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'

import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import history from './history'

import thunk from 'redux-thunk'

import PantryCookApi from './data/pantryCookApi'

import authReducer from './store/reducers/authReducer'
import recipesReducer from './store/reducers/recipesReducer'
import pantryReducer from './store/reducers/pantryReducer'
import pantryRecipeReducer from './store/reducers/pantryRecipeReducer'
import shoppingListReducer from './store/reducers/shoppingListReducer'

import { combineReducers } from 'redux'



const middlewares = [
    thunk.withExtraArgument({ PantryCookApi }),
    routerMiddleware(history)
]



const rootReducer = combineReducers({
    auth: authReducer,
    recipe: recipesReducer,
    pantry : pantryReducer,
    pantryRecipe: pantryRecipeReducer,
    shoppingList: shoppingListReducer,
    router: connectRouter(history)
})


const store = createStore(
    connectRouter(history)(rootReducer), 
    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();