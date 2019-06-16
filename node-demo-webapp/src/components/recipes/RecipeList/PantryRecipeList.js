import React from 'react'
import query_string from 'query-string'
import RecipeSummary from './RecipeSummary'
import PantryRecipesFilters from './PantryRecipesFilters'
import PageNavigator from './PageNavigator'
import { connect } from 'react-redux'
import ErrorAlert from '../../layout/ErrorAlert'
import { push, replace } from 'connected-react-router'
import { fetchRecipesPage, fetchRecipesPageByUri } from '../../../store/actions/pantryRecipeActions'
import Style from '../../../pantrycook-features'

const position = Style.position

class PantryRecipeList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { pageLimit: 4, query: null, //query without page
            searchIngs: [], searchCat: null } 
    }z
   
    componentDidMount() {
        const queryParams = analyseQuery(this.props.location.search)
        this.setState({ searchCat: queryParams.category, searchIngs: queryParams.ingredients })
        this.props.fetchRecipesPage(
            queryParams.page, 
            this.state.pageLimit, 
            queryParams.category, 
            queryParams.ingredients.length == 0 ? null : queryParams.ingredients)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.filters) {
            this.setState({ 
                searchCat: nextProps.filters.category,
                searchIngs: nextProps.filters.ingredients
            })
        }
    }

    handleIngredientSelection(suggestion) {
        const ings = this.state.searchIngs
        if(suggestion && !ings.find(i => i.name == suggestion.name)) {
            ings.push(suggestion)
            this.setState({ searchIngs: ings })
            this.search(ings, this.state.searchCat)
        }
    }

    handleCategorySelection(suggestion) {
        this.setState({ searchCat: suggestion })
        this.search(this.state.searchIngs, suggestion)
    }

    handleIngredientRemoval(ingredient) {
        const newIngsList = this.state.searchIngs.filter(i => i.name != ingredient.name)
        this.setState({ searchIngs: newIngsList })
        this.search(newIngsList, this.state.searchCat)
    }

    handleCategoryRemoval() {
        this.setState({ searchCat: null })
        this.search(this.state.searchIngs, null)
    }

    handleResetFilters() {
        if(this.state.searchIngs.length != 0 || this.state.searchCat) {
            this.setState({ searchIngs: [], searchCat: null })
            this.search([], null)
        }
    }

    search(ings, cat) {
        if(ings && ings.length == 0 && !cat)
            this.props.fetchRecipesPage(1, this.state.pageLimit);

        const query = buildClientQuery(ings, cat)
        this.setState({ query })
        this.props.fetchRecipesPage(
            1, this.state.pageLimit, 
            cat, ings.length == 0 ? null : ings,
            () => this.props.pushPageSearch(query))
    }

    changePage(uri) {
        const ings = this.state.searchIngs
        this.props.fetchRecipesPageByUri(
            uri,
            this.state.searchCat,
            ings.length == 0 ? null : ings,
            () => {
                let page = this.props.page.pageNumber
                let query = page == 1 ? '' : `page=${page}`
                if(this.state.query) 
                    query += `&${this.state.query}`
                this.props.pushPageSearch(query)
            })
    }

    render() {
        let { page, error, loading } = this.props
        
        if(error)
            return (
                <ErrorAlert/>
            )
        if(loading)
            return (
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )
        
        return (
            <div className="container" style={position.top}>
                {page &&
                    <div>
                        <PantryRecipesFilters
                            handleIngredientSelection={this.handleIngredientSelection.bind(this)}
                            handleIngredientRemoval={this.handleIngredientRemoval.bind(this)}
                            handleCategorySelection={this.handleCategorySelection.bind(this)}
                            handleCategoryRemoval={this.handleCategoryRemoval.bind(this)}
                            handleResetFilters={this.handleResetFilters.bind(this)}
                            searchIngs={this.state.searchIngs}
                            searchCat={this.state.searchCat}
                        />
                        <div className="dropdown-divider"/>
                        <div className="row">
                        {page.pageSize == 0 &&
                            <h6>Nothing to Show.</h6>
                        }
                        {page._embedded.recipes && 
                            page._embedded.recipes.map(recipe => 
                                <RecipeSummary key={recipe.id} recipe={recipe}/>)
                        }
                        </div> 
                        <div className="dropdown-divider"/>
                        <PageNavigator links={page._links} changePage={this.changePage.bind(this)}/>   
                        <div className="dropdown-divider"/>
                    </div>
                }
                            
            </div>
        )
    }
}

function analyseQuery(search) {
    const query = new URLSearchParams(search)
    let page = query.get('page')
    page = page == null ? 1 : page

    let category = query.get('category')
    if(category) category = { name: category }

    let ingredients = []
    let i = 1
    while(true){
        const val = query.get(`ing${i++}`)
        if(!val) break
        ingredients.push({ name: val })
    }
    return { page, category, ingredients }
}

function buildClientQuery(ings, cat) {
    let query = {}
    let num = 1
    if(ings)
        ings.forEach(ing => {
            query[`ing${num++}`] = ing.name
        })
    if(ings && ings.length <= 0)
        ings = null
    if(cat)
        query.category = cat.name
    query = query_string.stringify(query)
    query = query.replace(/%20/g, '+')
    return query
}

const mapStateToProps = (state) => {
    return {
        page: state.pantryRecipe.page,
        filters: state.pantryRecipe.filters,
        error: state.pantryRecipe.error,
        loading: state.pantryRecipe.loading,
        router: state.router
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipesPage: (page, limit, category, ingredients, updateClientUri) => 
            dispatch(fetchRecipesPage(page, limit, category, ingredients, updateClientUri)),
        fetchRecipesPageByUri: (uri, category, ingredients, updateClientUri) => 
            dispatch(fetchRecipesPageByUri(uri, category, ingredients, updateClientUri)),
            
        navigateToSignIn: () => dispatch(replace('/signin/')),
        pushPageSearch: (query) => dispatch(push(`/recipes?${query}`)),
        replacePageSearch: (query) => dispatch(replace(`/recipes?${query}`)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PantryRecipeList)