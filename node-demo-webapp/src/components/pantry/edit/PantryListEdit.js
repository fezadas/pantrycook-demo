import React from 'react'
import PantryEditForm from '../edit/PantryEditForm'
import Style from '../../../pantrycook-features'

const card = Style.card
const image = Style.image
const position = Style.position
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
                    <div className="card text-center" style={card.width}>
                       <h5 className="card-title">
                           {ing.Name}
                       </h5>
                       <img style = {image.small} src="/images/harvest.png"></img>
                       <div className="card-body">
                           <h6 className="card-subtitle mb-2 text-muted">
                               {ing.Quantity} {ing.Unity}
                           </h6>
                            <span style={card.pointer} onClick={() => { this.removeItem(ing)}} className="badge badge-danger">Delete</span>
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


