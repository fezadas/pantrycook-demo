import { LOCATION_CHANGE } from 'react-router-redux'
import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_PANTRY_RECIPE_INFO_SUCCESS,
    FETCH_RECIPES_PAGE_SUCCESS
} from '../actions/pantryRecipeActions'

const initState = {
    locationKey: null,
    currLocationState: null,
    page: null,
    filters: { category: null, ingredients: [] },
    loading: false, error: null, 
    recipeInfo: null,  
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
                error: action.payload.error
            }
        case FETCH_PANTRY_RECIPE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipeInfo: action.payload.recipeInfo
            }
        case LOCATION_CHANGE: {
            if(action.payload.action = 'PUSH') {
                const key = action.payload.location.key
                let currLocationState = sessionStorage.getItem(key)
                if(currLocationState != undefined) {
                    currLocationState = JSON.parse(currLocationState)
                    return {
                        ...state,
                        page: currLocationState.page,
                        filters: currLocationState.filters
                    }
                }
                else {
                    currLocationState = state.currLocationState
                    if(currLocationState != null) {
                        sessionStorage.setItem(key, JSON.stringify(currLocationState))
                        return {
                            ...state,
                            loading: false, error: null,
                            page: currLocationState.page,
                            filters: currLocationState.filters,
                            currLocationState: null
                        }
                    }
                    else return {
                        ...state,
                        currLocationKey: key
                    }
                }
            }
            return state
        }
        case FETCH_RECIPES_PAGE_SUCCESS:
            {
                const locationState = {
                    page: action.payload.page,
                    filters: action.payload.filters
                }
                if(state.currLocationKey) {
                    sessionStorage.setItem(state.currLocationKey, JSON.stringify(locationState))
                    return {
                        ...state,
                        loading: false,
                        error: null,
                        currLocationKey: null,
                        page: action.payload.page,
                        filters: action.payload.filters
                    }
                }
                else return {
                    ...state,
                    loading: false,
                    error: null,
                    currLocationState: locationState,
                    page: action.payload.page,
                    filters: action.payload.filters
                }
            }         
        default :
            return state
    }
}

export default recipesReducer 