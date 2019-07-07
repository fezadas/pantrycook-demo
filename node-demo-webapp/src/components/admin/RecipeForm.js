import React from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../../store/actions/adminActions'
import { push } from 'connected-react-router'
import Style from '../../pantrycook-features'
import IngredientForm from './IngredientForm'
import CategoriesForm from './CategoriesForm'

const position = Style.position
const form = Style.form

class RecipeForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ingredients: [], // { name, quantity, baseIngName: name, baseIng: { id }, newBaseIng: { volume, pictureUrl, density } }
            categories: [],
            addNewIng: false,
        }
    }

    componentDidMount(){  
       
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //Categories
    handleCategorySelection(suggestion) {
        const cats = this.state.categories
        if(cats.length == 2) {
            alert("You must only select 2 categories.")
        } else {
            if(suggestion && !cats.find(c => c.name == suggestion.name)) {
                cats.push(suggestion)
                this.setState({ categories: cats })
            }
        }
    }

    handleCategoryRemoval(category) {
        const newCatList = this.state.categories.filter(cat => cat.name != category.name)
        this.setState({ categories: newCatList })
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
        console.log(recipe)
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
        const { error, loading } = this.props
        return(
            <div style={position.centered_top}>
                <br/>
                <h3>New Recipe</h3>
                
                <br/>
                <form onSubmit={this.createRecipe.bind(this)}>

                    <button type="submit" className="btn btn-primary" >
                        Create Recipe
                    </button>

                    {loading &&
                        <div style = {position.centered} className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>
                    }
                    {error &&
                        <p>{error.Message}</p>
                    }

                    <br/><br/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        </div>
                        <input type="text" required="required" onChange={this.handleChange.bind(this)} className="form-control" id="name" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                        </div>
                        <textarea required="required" onChange={this.handleChange.bind(this)} placeholder="step by step, create your description" 
                            className="form-control" id="description" rows="8"></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Picture Url</span>
                        </div>
                        <input type="text" required="required" onChange={this.handleChange.bind(this)} className="form-control" id="pictureUrl" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Youtube Url</span>
                        </div>
                        <input type="text" className="form-control" id="youtubeUrl" onChange={this.handleChange.bind(this)} aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <br/>
                    <CategoriesForm
                        handleCategorySelection={this.handleCategorySelection.bind(this)}
                        handleCategoryRemoval={this.handleCategoryRemoval.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        categories={this.state.categories}
                    />
                    
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
                    </table>
                    <button 
                        type="button" className="btn btn-link"aria-label="Close"
                        onClick={() => this.setState({ addNewIng: true })}>
                        <span aria-hidden="true">Add ingredient</span>
                    </button>
                    

                    {this.state.addNewIng &&
                        <div>
                        <br/><br/>
                        <IngredientForm
                            handleAddIngredient={this.handleAddIngredient.bind(this)} />       
                        </div>
                    }
                </form>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        recipe: state.admin.recipe,
        error: state.admin.error,
        loading: state.admin.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      createRecipe: (recipe, redirectToRecipe) => dispatch(createRecipe(recipe, redirectToRecipe)),
      redirectRecipe: (id) => dispatch(push(`/recipes/${id}`))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)