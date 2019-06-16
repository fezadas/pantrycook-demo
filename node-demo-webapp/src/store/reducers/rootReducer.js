import { combineReducers } from 'redux'

import authReducer from './authReducer'
import recipesReducer from './recipesReducer'
import pantryReducer from './pantryReducer'
import pantryRecipeReducer from './pantryRecipeReducer'
import shoppingListReducer from './shoppingListReducer'
import userReducer from './userReducer'
import adminReducer from './adminReducer'

import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    recipe: recipesReducer,
    pantry : pantryReducer,
    pantryRecipe: pantryRecipeReducer,
    shoppingList: shoppingListReducer,
    user: userReducer,
    admin: adminReducer
})