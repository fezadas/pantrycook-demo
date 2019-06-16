import React from 'react'
import AutoSuggest from '../../AutoSuggest'
import PantryCookApi from './../../../data/pantryCookApi'
import Style from '../../../pantrycook-features'
import theme from './../../../theme.css'

const form = Style.form
const position = Style.position

class PantryRecipesFilters extends React.Component {

    constructor(props) {
        super(props)
        const pantryCookApi = new PantryCookApi()
        this.state = { pantryCookApi } 
    }

    fetchIngredientsBySuggestion(suggestion) {
        return this.state.pantryCookApi.ingredients.getList(suggestion)
            .then(res => {
                return res.ingredients
            })
    }

    renderIngredientSuggestion(suggestion) {
        return (
            <div className="result">
              <div>{suggestion.name}</div>
            </div>
          )
    }

    fetchCategoriesBySuggestion(suggestion) {
        return this.state.pantryCookApi.categories.getList(suggestion)
            .then(res => {
                return res.categories
            })
    }

    renderCategorySuggestion(suggestion) {
        return (
            <div className="result">
              <div>{suggestion.name}</div>
            </div>
          )
    }

    render() {
        return (
            <div>
                <h3>Filter search</h3>
                <h6>List of ingredients</h6>
                <div>
                    <AutoSuggest
                        handleSelection={this.props.handleIngredientSelection}
                        renderSuggestion={this.renderIngredientSuggestion}
                        onSuggestionsFetchRequested ={this.fetchIngredientsBySuggestion.bind(this)}
                        theme={theme}
                    />
                </div>
                <div>
                    {this.props.searchIngs.length > 0 &&
                        this.props.searchIngs.map(ing => <p key={ing.name}>{ing.name}
                        <button style={position.left} onClick={() => this.props.handleIngredientRemoval(ing)} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button></p>)
                    }
                </div>     
                <h6>Category</h6>
                <div>
                    <AutoSuggest 
                        handleSelection={this.props.handleCategorySelection}
                        renderSuggestion={this.renderCategorySuggestion}
                        onSuggestionsFetchRequested ={this.fetchCategoriesBySuggestion.bind(this)}
                        theme={theme}
                    />
                </div>
                <div>
                    {this.props.searchCat &&
                        <p key={this.props.searchCat.name}>{this.props.searchCat.name}
                        <button style={position.left} onClick={() => this.props.handleCategoryRemoval()} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button></p>
                    }
                </div>
                <button style = {form.top_padding} type="button" className="btn btn-primary" 
                    onClick={this.props.handleResetFilters}>
                    Reset search
                </button>
            </div>
        )
    }
}

export default PantryRecipesFilters