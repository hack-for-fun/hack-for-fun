import React from 'react';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import './PantryApp.css';

const PantryApp = props => {
    const [recipes, setRecipes] = React.useState([]);
    // const ingredients = ['apples', 'flour', 'sugar'];
    const [ingredients, setIngredients] = React.useState([]);

    const getIngredientData = () =>
        fetch(
            `https://xgsd7neuahgcwodbo7pxbttar5p5fhm6.apitracker.net/recipes/findByIngredients?ingredients=${ingredients}&number=2&ignorePantry=true&apiKey=443f34e2a79a4b029105534d36eaae12`
        )
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    const recipeIDs = data.map(item => item.id);
                    getAndSetRecipeData(recipeIDs, data);
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });

    const getAndSetRecipeData = (ids, recipesData) => {
        const recipeTargetURL = `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=443f34e2a79a4b029105534d36eaae12`;

        fetch(recipeTargetURL)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    const updatedRecipes = data.map(item => {
                        const matchingRecipe = recipesData.find(recipe => recipe.id === item.id);

                        if ('undefined' !== matchingRecipe) {
                            return { ...matchingRecipe, sourceUrl: item.sourceUrl };
                        }
                    });

                    setRecipes(updatedRecipes);
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    };

    const getRecords = async () => {
        const ingredientData = await getIngredientData();
        console.log("TCL: getRecords -> ingredientData", ingredientData)
        console.log("TCL: getRecords -> recipes", recipes)
    };

    return (
        <div className="root">
        <div className="wrappper">
            <h1 className="header">Welcome to the Pantry!</h1>
            {recipes && <RecipeList recipes={recipes} />}
            <RecipeForm setIngredients={setIngredients}/>
            <button className="button" type="button" onClick={getRecords}>
                Get Recipes
            </button>
            {/* IngredientsForm */}

            <div className="push"></div>
        </div>

        <footer>
            The Pantry 2019 ©.
        </footer>
        </div>
    );
};

export default PantryApp;
