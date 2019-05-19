import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Style from '../../pantrycook-features'

const card = Style.card

class ShoppingListItem extends React.Component {

    navigateClick(e){
        e.preventDefault();
        this.props.navigateToInfo(this.props.shoppingListInfo.id)
    }

    render(){
        return (
            <div className="col-sm">
                <div className="card text-white bg-info mb-3" style = {card.size_12}>
                <div className="card-header">{this.props.shoppingListInfo.name}</div>
                <div className="card-body">
                <i className="fas fa-clipboard-list fa-3x"></i>
                </div>
                <button className="btn btn-primary" type="button" onClick={this.navigateClick.bind(this)}>Details</button> 
                </div>
            </div>
        )
    }
}     

const mapStateToProps = (state) => {
    return {
        res: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToInfo: (id) => dispatch(push(`/shoppingLists/${id}`))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingListItem)