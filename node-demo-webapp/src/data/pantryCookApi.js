import Auth from './auth'
import Recipes from './recipes'
import PantryRecipes from './pantryRecipes'
import PantryIngredients from './pantryIngredients'
import ShoppingLists from './shoppingLists'
import Categories from './categories'
import Ingredients from './ingredients'
import Users from './user'

class PantryCookApi {

    constructor() {
        const SCHEMA_AUTHORITY =  'http://35.204.230.227'//'http://localhost:61549'
        const BASE_URL = `${SCHEMA_AUTHORITY}/api`

        this.auth = new Auth(BASE_URL)
        this.recipes = new Recipes(BASE_URL)
        this.pantryRecipes = new PantryRecipes(SCHEMA_AUTHORITY, BASE_URL)
        this.pantryIngredients = new PantryIngredients(BASE_URL)
        this.shoppingLists = new ShoppingLists(BASE_URL)
        this.categories = new Categories(BASE_URL)
        this.ingredients = new Ingredients(BASE_URL)
        this.users = new Users(BASE_URL)
    }
  }

export default PantryCookApi