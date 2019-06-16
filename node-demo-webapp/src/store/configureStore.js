import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import { connectRouter, routerMiddleware  } from 'connected-react-router'
import thunk from 'redux-thunk'

import PantryCookApi from '../data/pantryCookApi'
import storageUtils from '../storageUtils'

export default (history) => {    
    const reducer = rootReducer(history)
    const middlewares = [
        thunk.withExtraArgument({ 
            PantryCookApi: new PantryCookApi(),
            storageUtils 
        }),
        routerMiddleware(history)
    ]
    return createStore(
        connectRouter(history)(reducer),
        applyMiddleware(...middlewares)
    )
}