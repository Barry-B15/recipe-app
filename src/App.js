import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

    const APP_ID = 'f5d94d31';
    const API_KEY = "50dd58ce94210228fac942b4902dae09";

    // def a state to handle the response data from the api
    const [recipes, setRecipes] = useState([]);

    //const [counter, setCounter] = useState(0); // def counter and set it to 0

    useEffect(() => {
        // call get recipe
        getRecipes();
    }, []);

    // def an async func to get recipe
    const getRecipes = async() => {
        const recipeURL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`;
        const response = await fetch(recipeURL);

        const data = await response.json();
        console.log(data.hits);
        setRecipes(data.hits);
    }

    return ( <
        div className = "App" >
        <
        form className = "search-form" >
        <
        input className = "search-bar"
        type = "text" / >

        <
        button className = "search-button"
        type = "submit" > Search < /button>   < /
        form >

        {
            recipes.map(recipe => ( <
                Recipe title = { recipe.recipe.label }
                calories = { recipe.recipe.calories }
                image = { recipe.recipe.image }
                / >
            ))
        } <
        /div>
    );


}

export default App;