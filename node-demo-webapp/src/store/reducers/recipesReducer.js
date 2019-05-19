import {
    FETCH_RANDOM_BEGIN,
    FETCH_RANDOM_RECIPES_SUCCESS,
    FETCH_RANDOM_ERROR,
    FETCH_RECIPE_INFO_SUCCESS,
} from '../actions/recipeActions'

const initState = {
    recipes: { loading: false, recipes: null, recipeInfo: "dummy", error: 'colocar dummy data?' }
}

const recipesReducer = (state = initState, action) => {
    console.log(action.type)
    switch(action.type) {
        
        case FETCH_RANDOM_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_RANDOM_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipes: action.payload.recipes
            }
        case FETCH_RECIPE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipeInfo: action.payload.recipeInfo
            }
        case FETCH_RANDOM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                recipes: null
            }
        default :
            return state
    }
}

export default recipesReducer 