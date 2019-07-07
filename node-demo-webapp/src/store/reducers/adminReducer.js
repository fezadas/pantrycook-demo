import {
    BEGIN,
    ERROR,
    RECIPES_SUCCESS,
    CREATE_RECIPE_SUCCESS,
    GET_MEALDB_RECIPE_SUCCESS,
    DELETE_RECIPE_SUCCESS
} from '../actions/adminActions'

const initState = { loading: false, error: null, info: null }

const adminReducer = (state = initState, action) => {
    switch(action.type) {
        case BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }   
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }  
        case RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipes:action.payload.recipes
            }
        case CREATE_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipe: action.payload.recipe
            }
        case DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipes: action.payload.recipes
        }
        case GET_MEALDB_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                mealDbRecipe: action.payload.mealDbRecipe
            }
        default :
            return state
        }
}

export default adminReducer 