import React from 'react'
import PantryEditForm from '../edit/PantryEditForm'
import Style from '../../../pantrycook-features'

const card = Style.card

/**
 * Represents the editable list of ingredients from Pantry
 */

class PantryListEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quantity:''}
    }

    removeItem(item) {
        this.props.removeIng(item);
    }

    editItem(item){
        this.props.editIng(item); 
    }

    render() {
        return(
            <div className="row">
                { this.props.ingredients.map((ing) => {
                    return(
                <div key={ing.Id}>
                    <div className="col-sm">
                    <div onClick={() => { this.removeItem(ing)}} className="card text-center" style={card.width}>
                       <h5 className="card-title">
                           {ing.Name}
                       </h5>
                       <i className="fas fa-drumstick-bite fa-3x"></i>
                       <div className="card-body">
                           <h6 className="card-subtitle mb-2 text-muted">
                               {ing.Quantity} {ing.Unity}
                           </h6>
                       </div>
                   </div>
                   </div>
                <div className="dropdown-divider"/>
                <PantryEditForm editIng={this.editItem.bind(this)} ing={ing} />
                </div>
               )
                })}
            </div>
            
        );
    }
}
export default PantryListEdit


