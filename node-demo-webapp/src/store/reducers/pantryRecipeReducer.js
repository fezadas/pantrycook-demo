import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_PANTRY_RECIPE_INFO_SUCCESS,
    FETCH_RECIPES_PAGE_SUCCESS,
    FETCH_RECIPES_PAGE_BY_URI_SUCCESS
} from '../actions/pantryRecipeActions'

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

const initState = {
    locationKey: null,
    pages: [], // [ { locationKey: ..., page: ... }]
    loading: false, error: null, 
    recipeInfo: null,  
}

const recipesReducer = (state = initState, action) => {
    console.log(action)
    console.log(state)
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
        case LOCATION_CHANGE: {
            const key = action.payload.location.key
            console.log(key)
            if(action.payload.action = 'PUSH') {
                console.log(state)
                let page = state.pages.find(p => p.locationKey == key)
                if(page) {
                    return {
                        ...state,
                        page: page.page
                    }
                } else {
                    if(state.pages.length > 0) {                
                        page = state.pages[state.pages.length-1]
                        page.locationKey = key    
                        return {
                            ...state,
                            locationKey: key,
                            loading: false,
                            error: null,
                            page: page.page
                        }
                   }
                   else {
                       return { 
                           ...state,
                           locationKey: key
                       }
                   }  
                }         
            }
            else return {
                ...state
            }
        }
        case FETCH_RECIPES_PAGE_SUCCESS:
        case FETCH_RECIPES_PAGE_BY_URI_SUCCESS:
            {
                const page = {
                    locationKey: state.locationKey,
                    page: action.payload.page
                }
                state.pages.push(page)
                return {
                    ...state,
                    loading: false,
                    error: null,
                    page: page.page
                }
            }            
        default :
            return state
    }
}

export default recipesReducer 