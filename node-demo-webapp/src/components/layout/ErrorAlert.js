import React from 'react'
import Style from '../../pantrycook-features'

const position = Style.position

class ErrorAlert extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div style = {position.centered}>
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error Occured!</h4>
                {this.props.error ? (
                    <p>{this.props.error.Message}</p>
                ) : (
                    <p>Aww, unfortunately we couldn't reach our API. We are so sorry for the inconvenience.</p>
                )}
                <hr/>
            </div>
            </div>
        )
    }
}

export default ErrorAlert