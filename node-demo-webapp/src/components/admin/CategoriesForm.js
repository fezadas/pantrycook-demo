import React from 'react'
import { connect } from 'react-redux'
import { getRecipes } from '../../store/actions/adminActions'
import Style from '../../pantrycook-features'
import RecipeList from './RecipeList'
import AutoSuggest from '../AutoSuggest'
import theme from './../../theme.css'
import PantryCookApi from '../../data/pantryCookApi'

const position = Style.position

class CategoriesForm extends React.Component {

    constructor(props) {
        super(props)
        const pantryCookApi = new PantryCookApi()
        this.state = {
            pantryCookApi,
            newCategory: { name: "" },
            addNewCategory: false
        } 
    }

    renderCategoriesSuggestion(suggestion) {
        return (
            <div>
            <div className="result">
              <div>{suggestion.name}</div>
            </div>
            </div>
          )
    }

    fetchCategoriesBySuggestion(suggestion) {
        return this.state.pantryCookApi.categories.getList(suggestion)
            .then(res => {
                return res.categories
            })
    }

    handleCategoryNameChange(e){
        e.preventDefault()
        this.setState({
            newCategory: { name: e.target.value }
        })
    }

    handleAddCategory(e) {
        e.preventDefault()
        this.setState({
            newCategory: { name: "" },
            addNewCategory: false
        })
        this.props.handleCategorySelection(this.state.newCategory)
    }
    
    render(){
        return (
        <div>
            <span className="input-group-text">Categories</span>
            {this.props.categories.length > 0 &&
                this.props.categories.map(cat => <p key={cat.name}>{cat.name}
                <button style={position.left} onClick={() => this.props.handleCategoryRemoval(cat)} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button></p>)
            }

            <button
                type="button" className="btn btn-link"aria-label="Close"
                onClick={() => this.setState({ addNewCategory: true })}>
                <span aria-hidden="true">Add category</span>
            </button>
            {this.state.addNewCategory &&
                <div>
                <div className="form-row">
                    <p><span>Select a category </span><span> -> </span></p>
                    <AutoSuggest
                        handleSelection={this.props.handleCategorySelection}
                        renderSuggestion={this.renderCategoriesSuggestion}
                        onSuggestionsFetchRequested ={this.fetchCategoriesBySuggestion.bind(this)}
                        theme={theme}
                    />
                </div>
                <div className="input-group input-group-sm mb-3">
                <div >
                    <button 
                        disabled={this.state.newCategory.name == ""}
                        onClick={this.handleAddCategory.bind(this)}
                        className="btn btn-outline-secondary"
                        type="submit">
                            Create new category
                    </button>
                    <span> -> </span>
                </div>
                <div className="input-group-prepend">
                <input  className="form-control" id="newCategory" onChange={this.handleCategoryNameChange.bind(this)}
                    value={this.state.newCategory.name} type="text" placeholder="category name" autoComplete="off"/>
                </div>
                </div>
                </div>
            }
        </div>
    )}
}

export default CategoriesForm