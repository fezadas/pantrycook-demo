import React from 'react'
import AutoSuggest from './../../AutoSuggest'
import PantryCookApi from './../../../data/pantryCookApi'
import theme from '../../../theme.css'
import Style from '../../../pantrycook-features'

const form = Style.form

class PantryRecipesFilters extends React.Component {

    fetchIngredientsBySuggestion(suggestion) {
        return PantryCookApi.ingredients.getList(suggestion)
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
        return PantryCookApi.categories.getList(suggestion)
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
                        onSuggestionsFetchRequested ={this.fetchIngredientsBySuggestion}
                        theme={theme}
                    />
                </div>
                <div>
                    {this.props.searchIngs.length > 0 &&
                        this.props.searchIngs.map(ing => <p>{ing.name} <span className='close' 
                        onClick={() => this.props.handleIngredientRemoval(ing)}>X</span></p>)
                    }
                </div>     
                <h6>Category</h6>
                <div>
                    <AutoSuggest 
                        handleSelection={this.props.handleCategorySelection}
                        renderSuggestion={this.renderCategorySuggestion}
                        onSuggestionsFetchRequested ={this.fetchCategoriesBySuggestion}
                        theme={theme}
                    />
                </div>
                <div>
                    {this.props.searchCat &&
                        <p>{this.props.searchCat.name} <span className='close' 
                        onClick={() => this.props.handleCategoryRemoval()}>X</span></p>
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