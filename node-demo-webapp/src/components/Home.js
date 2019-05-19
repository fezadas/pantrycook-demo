import React from 'react'
import RecipeList from './recipes/RecipeList/RecipeList';

const Home = () => {
    return (
        <div>
        <div className="dropdown-divider"/>
        <div className="container">
            <header className="jumbotron my-4">
                <h3 className="display-4"> 
                    Welcome to Pantry Cook Web Application!
                </h3>
                <p className="lead">
                    Here you can find a lot of recipes. 
                    You only have to keep your pantry updated and we do the work for you.
                </p>
            </header>
        </div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">
                        Random Recipes
                    </h5>
                    <p className="card-text">
                        We have a lot of recipes, just choose one.
                    </p>
                    </div>
                </div>
            <div className="dropdown-divider"/>
            <div className="container">
        <RecipeList/>
        </div>
        </div>
    )
}

export default Home