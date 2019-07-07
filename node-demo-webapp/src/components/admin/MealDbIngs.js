import React from 'react'
import Style from '../../pantrycook-features'
import AutoSuggest from '../AutoSuggest'
import theme from './../../theme.css'
import PantryCookApi from '../../data/pantryCookApi'
import AddNewBaseIng from './AddNewBaseIng'

const position = Style.position

class MealDbIngForm extends React.Component {

    constructor(props) {
        super(props)
        const ing = this.props.ingredient
        const pantryCookApi = new PantryCookApi()
        this.state = { 
          pantryCookApi,
          strUnity: ing.unity, strPictureUrl: ing.pictureUrl,
          name: ing.name, quantity: ing.quantity, unity: "",
          baseIng: null, newBaseIng: { name: "", volume: "", pictureUrl: "", density: 1 },
          createNewBaseIng: false
        } 
    }

    handleBaseIngSelection(suggestion) {
      if(suggestion) this.setState({ baseIng: suggestion })
    }
    handleBaseIngRemoval() {
      this.setState({ baseIng: null })
    }
    renderIngredientSuggestion(suggestion) {
      return (<div className="result">{suggestion.name}</div>)
    }
    fetchIngredientsBySuggestion(suggestion) {
        return this.state.pantryCookApi.ingredients.getList(suggestion)
            .then(res =>  res.ingredients)
    }

    createNewBaseIng(e){
      e.preventDefault()
      const createNewBaseIng = !this.state.createNewBaseIng
      if(!createNewBaseIng) 
        this.setState({ createNewBaseIng, newBaseIng: { name: "", volume: "", pictureUrl: "", density: 1 } })
      else
        this.setState({ createNewBaseIng, baseIng: null })
    }

    handleAddIngredient(e) {      
      e.preventDefault()
      const {baseIng, newBaseIng} = this.state
      const ingredient = { 
        name: this.state.name,
        quantity: this.state.unity == "To taste" ? 0 : this.state.quantity,
        unity: this.state.unity,
      }
      if(baseIng) {
        ingredient.baseIng = {}
        ingredient.baseIng.id = baseIng.id
        ingredient.baseIngName = baseIng.name
      }
      else {
        ingredient.newBaseIng = {}
        ingredient.baseIngName = newBaseIng.name
        ingredient.newBaseIng.pictureUrl = newBaseIng.pictureUrl
        ingredient.newBaseIng.volume = newBaseIng.volume
        ingredient.newBaseIng.density = newBaseIng.density
      }
      this.setState({ 
        name: "", quantity: "",  unity: "",
        baseIng: null, newBaseIng: { name: "", volume: "", pictureUrl: "", density: 1 },
        createNewBaseIng: false
      })
      this.props.handleAddIngredient(ingredient)
    }

    cannotAddNewIngredient() {
      const {baseIng, newBaseIng, createNewBaseIng, name, quantity, unity} = this.state
      if(unity != "To taste") {
        if(unity == "" && quantity == "")
          return true
        if(unity != "" && quantity == "")
          return true
      }
      if(!createNewBaseIng && baseIng)
        return false
      if(createNewBaseIng && newBaseIng.name != ""  && newBaseIng.volume != "" && newBaseIng.pictureUrl != "" && newBaseIng.density != null)
        return false
        
      return true
    }

    handleNewBaseIngChange(e) {
      e.preventDefault()
      const newBaseIng = this.state.newBaseIng
      newBaseIng[e.target.id] = e.target.value
      this.setState({ newBaseIng })
    }

    handleChange(e) {
      e.preventDefault()
      this.setState({ [e.target.id]: e.target.value })
    }
    handleUnityChange(e) {
      e.preventDefault()
      if(e.target.value == "To taste")
        return this.setState({ quantity: "", unity: e.target.value })
      this.setState({ unity: e.target.value })
    }
     
    render() {
        return (
        <div>
          <hr
              style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 1
              }}
          />
        <div>
        <img src={this.state.strPictureUrl} className="rounded mx-auto d-block" alt="..."/>
          <p className="font-weight-bold">Picture Url: {this.state.strPictureUrl}</p>
          <p className="font-weight-bold">Unit: {this.state.strUnity}</p>
        <div className="form-row">
          {this.newInput('Recipe Ingredient Name', 'text', 'name', this.state.name)}
          {this.newInput('Quantity', 'text', 'quantity', this.state.quantity, this.state.unity == 'To taste')}
          <div className="col">
            <span className="input-group-text">Unit</span>
            <select id="unity" onChange={this.handleUnityChange.bind(this)} className="form-control">
              <option selected></option>
              <option>g</option>
              <option>ml</option>
              <option>tbs</option>
              <option>tsp</option>
              <option>ounce</option>
              <option>pinch</option>
              <option>cup</option>
              <option>1/2 cup</option>
              <option>1/3 cup</option>
              <option>1/4 cup</option>
              <option>1/2 tbs</option>
              <option>1/4 tbs</option>
              <option>1/2 tsp</option>
              <option>1/4 tsp</option>
              <option>1/8 tsp</option>
              <option>3/4 tsp</option>
              <option>Handfull</option>
              <option>To taste</option>
            </select>
          </div>
        </div>

<br></br>
        <span className="input-group-text">
          Base Ingredient</span>
        {!this.state.createNewBaseIng &&
          this.selectBaseIngredient()
        }
        <button type="submit" className="btn btn-default"
          onClick={this.createNewBaseIng.bind(this)}>
            Create New Base Ingredient &#8595;
        </button>
        
        {this.state.createNewBaseIng && 
          <AddNewBaseIng 
            handleChange={this.handleNewBaseIngChange.bind(this)}  
          />
        }
        <br/>
        <button type="submit" className="btn btn-default"
          onClick={this.handleAddIngredient.bind(this)}
          disabled={this.cannotAddNewIngredient()}>
            Add Ingredient to Recipe
        </button>
        </div>
      </div>
    )}

    newInput(span, inputType, id, value, disabled = false) {
      return (
        <div className="col">
            <span className="input-group-text">{span}</span>
            <input type={inputType} value={value} disabled={disabled}
              id={id} onChange={this.handleChange.bind(this)} 
              className="form-control" aria-describedby="inputGroup-sizing-default"/>
        </div>
      )
    }

    selectBaseIngredient(){
      return (
        <div>
          <div className="col">
                  
                  <div className="form-row">
                    <p>Select a ingredient</p>
                    <AutoSuggest
                      handleSelection={this.handleBaseIngSelection.bind(this)}
                      renderSuggestion={this.renderIngredientSuggestion}
                      onSuggestionsFetchRequested ={this.fetchIngredientsBySuggestion.bind(this)}
                      theme={theme}
                    />
                  </div>
                    
                </div>
                <div>
                  {this.state.baseIng &&
                      <p key={this.state.baseIng.id}>
                        {this.state.baseIng.name}
                        <button style={position.left} 
                          onClick={this.handleBaseIngRemoval.bind(this)} type="button"
                          className="close" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </p>
                  }
                </div>
          </div>
      )
    }
}

export default MealDbIngForm