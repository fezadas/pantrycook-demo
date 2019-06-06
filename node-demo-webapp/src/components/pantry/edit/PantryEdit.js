import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { editPantryIngredient, removePantryIngredient, fecthPantrytoEdit, fillPantryIngredient } from '../../../store/actions/pantryActions'
import PantryListEdit from '../edit/PantryListEdit'
import ErrorAlert from '../../layout/ErrorAlert'
import Style from '../../../pantrycook-features'
import { isAuthenticated } from './../../../storageUtils'

const position = Style.position
const form = Style.form
const suggestions = Style.autoSuggest
const list = Style.list

/**
 * Represent the Parent Component from Pantry Edit Route
 */
class PantryEdit extends React.Component {

    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        if(!isAuthenticated()){
            this.props.redirectLogin()
        }
        else
        this.props.getPantry()
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {value,quantity} = this.state
        let items = this.props.items.ingredients
        let ingredientInfo = items.find(elem => elem.Name == value)
        let pantry = this.props.pantry.ingredients

        if(isNaN(quantity)) alert("Quantity must be a number.")

        else if(ingredientInfo)
            { 
                let id = ingredientInfo.Id 
                if(pantry.find(elem => elem.Id == id)) alert("Already added this Ingredient.")
                else 
                { 
                    let ingredient = {id:ingredientInfo.Id,quantity}        
                    this.props.fillPantry(ingredient)
                }  
            }
            else alert("You must choose a ingredient from suggestions.")

        this.setState({quantity:'',value:''})
    }

    removeIng(ingredient){
        this.props.removePantry(ingredient.Id)
    }

    editIng(ingredient){
        this.props.editPantry(ingredient)
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = []
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            let items = this.props.items.ingredients
            suggestions = items.sort().filter(v => regex.test(v.Name)).slice(0,4) 
        }
        this.setState(()=>({suggestions,value: value}))
    }

    onQuantityChange = (e) => {
        console.log(this.state)
        const quantity = e.target.value;
        this.setState(()=>({quantity:quantity}))
    }

    suggestionsSelected(value){
        this.setState({
            value:value,
            suggestions:[]
        })

    }

    renderSuggestions() {
        const suggestions = this.state
        if(suggestions == null){
            return null
        }
        return(
            <ul className="list-group">
                {suggestions.suggestions.map((item)=> <li key={item.Name} className="list-group-item" onClick={() => this.suggestionsSelected(item.Name)}>{item.Name}</li>)}
            </ul>
        )

    }

    render() {
        const { pantry, items, error, loading} = this.props
        const text = this.state
        const value = text ? text.value : ''
        const quantity = text ? text.quantity : ''
        
        if(error)
            return (
                <div style={position.centered_1}>
                    <ErrorAlert />
                </div>  
            )

        if(loading) 
            return(
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )

        if(items) {    
            return (
                <div >
                    <div>
                    <div style={position.top} className="container">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">1 - To Add an Ingredient, choose the name and quantity.</p>
                            <p className="card-text">2 - To Remove you can simply click on the ingredient you want to remove.</p>
                            <p className="card-text">3 - To Edit an Ingredient ...</p>
                            </div>
                    </div>
                    <div className="dropdown-divider"></div> 
                    <div>  
                        <form autoComplete="off" className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group mx-sm-3 mb-2">
                                <label className="sr-only">Ingredient</label>
                                <input required="required" name="ingredient" style={form.input_style_1} value={value} onChange={this.onTextChange} className="form-control" type="text"  placeholder="Ingredient"></input>
                                <ul style={suggestions.ul_suggestions}>
                                        {this.renderSuggestions()}
                                </ul>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <label className="sr-only">Quantity</label>
                                <input required="required" style={form.input_style_2} value={quantity} onChange={this.onQuantityChange} name="quantity" type="text" className="form-control" id="quantity" placeholder="Quantity"/>
                            </div>
                            <button style={form.button_left_padding} type="submit" className="btn btn-primary mb-2">Add</button>
                        </form>
                    </div>
                    
                    <div style={list.top}> 
                    <PantryListEdit 
                        ingredients={pantry.ingredients} 
                        removeIng={this.removeIng.bind(this)} 
                        editIng={this.editIng.bind(this)}
                    />
                    </div>
                    </div>
                    </div>
                </div>
            );
        }
        else return(<div></div>)
        
    }
}

const mapStateToProps = (state) => {
    return {
        pantry: state.pantry.pantry,
        error: state.pantry.error,
        loading : state.pantry.loading,
        value: '',
        quantity:'',
        items: state.pantry.ingredients,
        suggestions:[],
        ingredient:'',
        auth: localStorage.getItem('access_token')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPantry: () => dispatch(fecthPantrytoEdit(null,null)),
        fillPantry:(ingredient) => dispatch(fillPantryIngredient(ingredient)),
        removePantry:(id) => dispatch(removePantryIngredient(id)),
        editPantry:(ingredient) => dispatch(editPantryIngredient(ingredient)),
        redirectLogin: () => dispatch(push(`/signin`))
    }
}

//sugestões -> está a ser obtida a pantry do user e os ingredientes que ele não contem
//sao usadas para fazer as sugestões. é carregado tudo ao inicio
//no entanto tambem se poderia adoptar por fazer mais pedidos http para ir buscar
//sugestoes com base no que o utilizador vai escrevendo

export default connect(mapStateToProps,mapDispatchToProps)(PantryEdit)