import React, { Component } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'

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

class App extends Component {
  render() {
    return (
        <div className="App">
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component = {Home}/> 
          <Route exact path='/contacts' component = {Contacts}/> 
          <Route exact path='/recipes' component = {PantryRecipeList}/>
          <Route exact path='/recipes/:r_id' component = {RecipeInfo}/>
          <Route exact path='/pantry' component = {PantrySearchBar}/>
          <Route exact path='/pantry/edit' component = {PantryEdit}/>
          <Route exact path='/shoppingLists' component = {ShoppingLists}/>
          <Route exact path='/shoppingLists/:sl_id' component = {ShoppingList}/>
          <Route exact path='/shoppingLists/:sl_id/edit' component = {ShoppingListEdit}/>
          <Route exact path='/signin' component = {SignIn}/>
          <Route exact path='/signup' component = {SignUp}/> 
          <Route exact path='/user' component = {UserInfo}/> 
        </Switch>
        </div>
        </div>
    );
  }
}

export default App
