import React from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Home from './components/Home'
import RecipeInfo from './components/recipes/RecipeInfo/RecipeInfo'
import PantryRecipeList from './components/recipes/RecipeList/PantryRecipeList'
import Contacts from './components/Contacts'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import PantrySearchBar from './components/pantry/PantrySearchBar'
import PantryEdit from './components/pantry/edit/PantryEdit'
import ShoppingList from './components/shoppingList/ShoppingList'
import ShoppingLists from './components/shoppingList/ShoppingLists'
import ShoppingListEdit from './components/shoppingList/ShoppingListEdit'
import UserInfo from './components/user/UserInfo'
import Tools from './components/admin/Tools'

const App = () => (
  <div className="App">
    <Navbar/>
    <div className="container">
      <Switch>
        <Route exact path='/' component = {Home}/> 
        <Route exact path='/contacts' component = {Contacts}/>
        <Route exact path='/recipes' component = {PantryRecipeList}/> 
        <Route exact path='/recipes/:r_id' component = {RecipeInfo}/>
        <PrivateRoute exact path='/pantry' component = {PantrySearchBar}/>
        <PrivateRoute exact path='/pantry/edit' component = {PantryEdit}/>
        <PrivateRoute exact path='/shoppingLists' component = {ShoppingLists}/>
        <Route exact path='/shoppingLists/:sl_id' component = {ShoppingList}/>
        <PrivateRoute exact path='/shoppingLists/:sl_id/edit' component = {ShoppingListEdit}/>
        <Route exact path='/signin' component = {SignIn}/>
        <Route exact path='/signup' component = {SignUp} /> 
        <PrivateRoute exact path='/user' component = {UserInfo} /> 
        <PrivateRoute exact path='/tools' component = {Tools} /> 
      </Switch>
    </div>
    <div className="dropdown-divider"></div>
    <footer className="mastfoot mt-auto">
      <div className="inner">
      <span className="font-weight-bold">Pantry Cook©</span> created by fezadas and inesmg.
      </div>
    </footer>
    <div className="dropdown-divider"></div>
  </div>
)

export default App
