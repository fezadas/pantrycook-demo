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
                    <button style={form.button_right_padding} type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.first.href)}> 
                        First
                    </button>
                }
                {links.prev &&
                    <button style={form.button_right_padding} type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.prev.href)}> 
                        Prev
                    </button>
                }
                {links.next &&
                    <button  type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.next.href)}> 
                        Next
                    </button>
                }
                {links.last &&
                    <button style={form.button_left_padding} type="button" className="btn btn-secondary" onClick={() => this.handlePageChange(links.last.href)}> 
                        Last
                    </button>
                }
            </div>
        )
    }
}

export default PageNavigator