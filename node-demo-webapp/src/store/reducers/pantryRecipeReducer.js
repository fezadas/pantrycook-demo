import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_PANTRY_RECIPE_INFO_SUCCESS,
    FETCH_RECIPES_PAGE_SUCCESS,
    FETCH_RECIPES_PAGE_BY_URI_SUCCESS
} from '../actions/pantryRecipeActions'

const initState = {
    recipes: { loading: false, recipes: null, page: null, recipeInfo: "dummy", error: 'colocar dummy data?' }
}

const recipesReducer = (state = initState, action) => {
    switch(action.type) {
        
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                recipes: null
            }
        case FETCH_PANTRY_RECIPE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipeInfo: action.payload.recipeInfo
            }
        case FETCH_RECIPES_PAGE_SUCCESS:
        case FETCH_RECIPES_PAGE_BY_URI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                page: action.payload.page
            }
        default :
            return state
    }
}

export default recipesReducer 