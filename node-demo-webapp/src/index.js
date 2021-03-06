import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from "react-redux"
import { ConnectedRouter } from 'connected-react-router'

import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'

const history = createBrowserHistory()
const store  = configureStore(history)
const MOUNT_NODE = document.getElementById('root')

const dotenv = require('dotenv');
dotenv.config();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();