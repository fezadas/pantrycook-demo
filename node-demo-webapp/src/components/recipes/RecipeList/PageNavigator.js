import React from 'react'
import Style from '../../../pantrycook-features'
const form = Style.form

class PageNavigator extends React.Component {

    handlePageChange(uri) {
        this.props.changePage(uri)
    }

    render() {
        const links = this.props.links
        return ( 
            <div>
                {links.first &&
                    <button  type="button" className="btn btn-primary" onClick={() => this.handlePageChange(links.first.href)}> 
                        First
                    </button>
                }
                <span> </span>
                {links.prev &&
                    <button type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.prev.href)}> 
                        Prev
                    </button>
                }
                <span> </span>
                {links.next &&
                    <button  type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.next.href)}> 
                        Next
                    </button>
                }
                <span> </span>
                {links.last &&
                    <button type="button" className="btn btn-primary" onClick={() => this.handlePageChange(links.last.href)}> 
                        Last
                    </button>
                }
            </div>
        )
    }
}

export default PageNavigator