import React from 'react'
import Style from '../../../pantrycook-features'

const form = Style.form

/**
 * Represent the Form to change quantity of specific Pantry Ingredient
 */
class PantryEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity:'',
            cannotSaveChanges:false
        }
    }

    onQuantityChange(value, id){
        const cannotSaveChanges = isNaN(value) || value <= 0 
            ? true : false
        this.setState(()=>({id,quantity:value,cannotSaveChanges}))
    }

    editItem = (e) =>{
        e.preventDefault()
        let ingredient = this.state
        this.props.editIng(ingredient);
        this.setState({
            quantity: "",
            cannotSaveChanges:false
        });
    }

    render() {
        const quantity = this.state.quantity
        return(
            <form autoComplete="off" onSubmit={this.editItem.bind(this)}>
                <div style={form.edit_box_position} className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <button 
                     disabled={this.state.cannotSaveChanges}
                     type="submit" className="btn btn-outline-secondary" id="button-addon1">Edit
                    </button>
                </div>
                <input id={this.props.ing.Id} value={quantity} onChange={e=>this.onQuantityChange(e.target.value, this.props.ing.Id)} name="quantity" 
                type="text" className="form-control" placeholder="New quantity" aria-label="Example text with button addon" 
                aria-describedby="button-addon1"/>
                </div>
            </form>
        )
    }
}

export default PantryEditForm