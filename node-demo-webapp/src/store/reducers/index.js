import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

import authReducer from './authReducer'
import recipesReducer from './recipesReducer'
import pantryReducer from './pantryReducer'
import pantryRecipeReducer from './pantryRecipeReducer'
import shoppingListReducer from './shoppingListReducer'
import userReducer from './userReducer'

import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    recipe: recipesReducer,
    pantry : pantryReducer,
    pantryRecipe: pantryRecipeReducer,
    shoppingList: shoppingListReducer,
    user: userReducer
})

export default (history) => persistReducer(
    {
        key: 'root',
        storage,
        whitelist: [],
    },
    rootReducer(history),
)