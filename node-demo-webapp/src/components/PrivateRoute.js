import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './../storageUtils'

const PrivateRoute = ({ component, exact = false, path }) => {
    return <Route
        exact={exact}
        path={path}
        render={props => (
            isAuthenticated() ? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: props.location }
                }}/>
            )
        )}
    />
}

export default PrivateRoute