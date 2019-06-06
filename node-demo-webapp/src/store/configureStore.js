import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index'
import { persistStore } from 'redux-persist'
import { connectRouter, routerMiddleware  } from 'connected-react-router'

import thunk from 'redux-thunk'
import PantryCookApi from '../data/pantryCookApi'
import storageUtils from '../storageUtils'

let persistor
let store

export default (history) => {
    if (store) {
        return store;
    }

    const middlewares = [
        thunk.withExtraArgument({ 
            PantryCookApi: new PantryCookApi(),
            storageUtils 
        }),
        routerMiddleware(history)
    ]

    const enhancers = [applyMiddleware(...middlewares)]
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    store = createStore(
        connectRouter(history)((reducer(history))),
        composeEnhancers(...enhancers)
    )
    persistor = persistStore(store)

    return { store, persistor }
}