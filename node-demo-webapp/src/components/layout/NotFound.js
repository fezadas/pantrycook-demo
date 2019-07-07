import React from 'react'
import ErrorAlert from './ErrorAlert'

const error = { Message: "404 - Page not found."}

const SignedOutLinks = () => {
    return (
        <ErrorAlert error={error}/>
    )
}

export default SignedOutLinks