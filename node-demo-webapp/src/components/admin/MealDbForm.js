import React from 'react'
import { connect } from 'react-redux'
import { createRecipe, getRandomMealDbRecipe } from '../../store/actions/adminActions'
import { push } from 'connected-react-router'
import Style from '../../pantrycook-features'
import MealDbIngForm from './MealDbIngs'
import PantryCookApi from '../../data/pantryCookApi'
import storageUtils from '../../storageUtils'
import ErrorAlert from '../layout/ErrorAlert'

const position = Style.position

class MealDbForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ingredients: [], //{ name, quantity, baseIngName: name, baseIng: { id }, newBaseIng: { volume, pictureUrl, density } }
            categories: [],
            loading:true
        }
    }

    componentDidMount(){  
       const p = new PantryCookApi()
       const that = this
       p.admin.getRandomMealDbRecipe(storageUtils.getTokens().accessToken)
        .then(recipe => {
            const categories = recipe.categories.map(cat => {return { name: cat }})
            that.setState({ 
                loading:false,
                categories, 
                mealDbRecipe: recipe,
                name: recipe.name, 
                description: recipe.description, 
                pictureUrl: recipe.pictureUrl, 
                youtubeUrl: recipe.youtubeUrl })
        })
    }
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddIngredient(ingredient) {
        const ingredients = this.state.ingredients
        ingredients.push(ingredient)
        this.setState({ ingredients, addNewIng: false })
    }

    removeIngredient(ing) {
        const ingredients = this.state.ingredients.filter(i => i.name != ing.name)
        this.setState({ ingredients })
    }

    createRecipe(e) {
        e.preventDefault()
        const recipe = {
            name: this.state.name,
            description: this.state.description,
            pictureUrl: this.state.pictureUrl,
            youtubeUrl: this.state.youtubeUrl,
            categories: this.state.categories.map(c => c.name),
            ingredients: this.state.ingredients.map(ing => {
                const i = {
                    name: ing.name,
                    unity: ing.unity,
                    quantity: ing.quantity
                }
                if(ing.baseIng) { //base ing already exists
                    i.idBaseIng = ing.baseIng.id
                }
                else { //new base ingredient
                    i.newBaseIng = { 
                                    ingName: ing.baseIngName, 
                                    volume: ing.newBaseIng.volume, 
                                    pictureUrl: ing.newBaseIng.pictureUrl,
                                    density: ing.newBaseIng.density
                                }
                }
                return i
            })
        }
        this.props.createRecipe(recipe, 
            (id)=>{this.props.redirectRecipe(id)})
    }

    handleChange(e){
        e.preventDefault()
          this.setState({
              [e.target.id]: e.target.value
          })
      }

    render() {
        const { error } = this.props
        const { mealDbRecipe } = this.state
        console.log(this.state.loading)
        if(error)
            return (
                <div style={position.centered_1}>
                    <ErrorAlert />
                </div>  
            )

        if(this.state.loading) 
            return(
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )

        if(mealDbRecipe) {
        return(
            <div style={position.centered_top}>
                <br/>
                <h3>New Recipe</h3>
                
                <br/>
                <form onSubmit={this.createRecipe.bind(this)}>

                    <button type="submit" className="btn btn-primary" >
                        Create Recipe
                    </button>
                    <br/><br/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        </div>
                        <input type="text" required="required" 
                            onChange={this.handleChange.bind(this)} className="form-control" aria-describedby="inputGroup-sizing-default"
                            id="name" value={this.state.name} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                        </div>
                        <textarea required="required" onChange={this.handleChange.bind(this)} placeholder="step by step, create your description" 
                            className="form-control" id="description" value={this.state.description} rows="8"></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Picture Url</span>
                        </div>
                        <input type="text" required="required" onChange={this.handleChange.bind(this)} className="form-control" 
                            id="pictureUrl" value={this.state.pictureUrl} aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Youtube Url</span>
                        </div>
                        <input type="text" className="form-control" id="youtubeUrl" value={this.state.youtubeUrl} onChange={this.handleChange.bind(this)} aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <br/>
                    {this.state.categories.map(c => {
                       return <div>
                            <span key={c.name} className="badge badge-secondary">{c.name}</span>
                           </div>
                    })}
                    <br/>
                    <span className="input-group-text">Ingredients</span>
                    <br></br>
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Base Ingredient</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.ingredients && this.state.ingredients.map(ing => {
                        return (<tr>
                            <td>{ing.name}</td>
                            <td>{ing.quantity}</td>
                            <td>{ing.unity}</td>
                            <td>{ing.baseIngName}</td>
                            <td>
                                <button style={position.left} 
                                    onClick={this.removeIngredient.bind(this, ing)} type="button"
                                    className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </td>
                            </tr>)
                    })}
                    </tbody>
                    <button 
                        type="button" className="btn btn-link"aria-label="Close"
                        onClick={() => this.setState({ addNewIng: true })}>
                        <span aria-hidden="true">Add ingredient</span>
                    </button>
                    </table>

                    {mealDbRecipe.ingredients.map(ing => {
                        return <div key={ing.name}>
                        <br/><br/>
                        <MealDbIngForm
                            ingredient={ing}
                            handleAddIngredient={this.handleAddIngredient.bind(this)} />       
                        </div>
                    })}
                </form>
            </div>
        )
                }else
                    return <p>fijoefujiedkwr</p>
    }
}

const mapStateToProps = (state) => {
    return {
        recipe: state.admin.recipe,
        error: state.admin.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      createRecipe: (recipe, redirectToRecipe) => dispatch(createRecipe(recipe, redirectToRecipe)),
      getRandomMealDbRecipe: () => dispatch(getRandomMealDbRecipe()),
      redirectRecipe: (id) => dispatch(push(`/recipes/${id}`))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MealDbForm)