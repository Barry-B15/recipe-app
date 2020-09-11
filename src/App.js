import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

    const APP_ID = 'f5d94d31';
    const API_KEY = "50dd58ce94210228fac942b4902dae09";

    // def a state to handle the response data from the api
    const [recipes, setRecipes] = useState([]);

    const [search, setSearch] = useState(''); // create a state for the search

    // state for query entered by user
    const [query, setQuery] = useState('chicken'); // set to "chicken" since that is what we have as the query in our api url

    //const [counter, setCounter] = useState(0); // def counter and set it to 0

    useEffect(() => {
        // call get recipe
        getRecipes();
    }, [query]);

    // def an async func to get recipe
    const getRecipes = async() => {
        const recipeURL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`; // change 'chicken' to the 'query', our new state
        const response = await fetch(recipeURL);

        const data = await response.json();
        console.log(data.hits);
        setRecipes(data.hits);
    }

    // def a function to run when changes happens
    const updateSearch = e => {
        setSearch(e.target.value);
        //console.log(search);
    }

    //Def getSearch to get the search query
    const getSearch = e => {
        e.preventDefault(); // prevent the page refresh
        setQuery(search); // setQuery to whatever we have in our search to get the finished text
        // set this getSearch to onSubmit in the <form> 
        setSearch(''); // set search bak to null to clear the search box when done
    }

    return ( <
        div className = "App" >
        <
        form onSubmit = { getSearch }
        className = "search-form" >
        <
        input className = "search-bar"
        type = "text"
        value = { search }
        onChange = { updateSearch }
        / >

        <
        button className = "search-button"
        type = "submit" > Search < /button>   < /
        form >

        <
        div className = "recipes" >

        {
            recipes.map(recipe => ( <
                Recipe key = { recipe.recipe.label }
                title = { recipe.recipe.label }
                calories = { recipe.recipe.calories }
                image = { recipe.recipe.image }
                ingredients = { recipe.recipe.ingredients }
                / >
            ))
        } <
        /div>  <
        /div>
    );


}

export default App;