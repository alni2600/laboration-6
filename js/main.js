"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Alexandra Nilsson
 */

//hämtar element från DOM
const form = document.getElementById("searchform");
const inputEl = document.getElementById("search");
const errorEl = document.getElementById("error");
const errorSection = document.getElementById("message");
const recipeSection = document.getElementById("recipe");

//validerar det som matats in i sök-fältet
// tillräckligt lite kod för att jag inte ska vilja ha separat display-error-funktion - OK
function validateInput(){
    //tömmer ev. tidigare felmeddelanden
    errorEl.innerHTML = "";

    //testar om inmatningsfältet är tomt
    if (inputEl.value.trim() === "") {
        //om det är tomt visas ett felmeddelande och funktionen returnerar false
        errorEl.innerHTML = "Du måste skriva ett sökord";
        return false;
    } else {
        //om sökfältet är ifyllt returneras true
        return true;
    }
}

//hämtar API - OK
async function fetchRecipes (searchPhrase) {
    //skapar en url med sökordet från formuläret
    const url = `https://dummyjson.com/recipes/search?q=${searchPhrase.value}&limit=1`;

    //körs först
    try {
        //await = väntar på att APIn ska hämtas
        const response = await fetch(url);
       //omvandlar till js
        const data = await response.json();

        //returnerar data
        return data;
    } 
    //fångar upp eventuella fel
    catch (error){
        console.log("Fel vid hämtning av API", error);
        throw error;
    }
}

//börjar med att hitta rätt info i arrayen vi får tillbaka och lägger in det i ett objekt
function createRecipeObj (recipeToBeDisplayed){

    let recipeObj = {
       //det vi vill ska visas sparas läses in i ny key
        name: recipeToBeDisplayed.recipes[0].name,
        image: recipeToBeDisplayed.recipes[0].image,
        servings: recipeToBeDisplayed.recipes[0].servings,
        prepTimeMinutes: recipeToBeDisplayed.recipes[0].prepTimeMinutes,
        cookTimeMinutes: recipeToBeDisplayed.recipes[0].cookTimeMinutes,
        difficulty: recipeToBeDisplayed.recipes[0].difficulty,
        
        ingredients: recipeToBeDisplayed.recipes[0].ingredients,
        instructions: recipeToBeDisplayed.recipes[0].instructions
    }
}

//ska göra layoten till receptkortet och ta in informationen från recipeObj
function displayRecipe (){

}
displayRecipe();


//läser in det som skrivs i sökfältet. Även detta en async-funktion, annars får jag bara "promise" från fetchRecipes. 
form.addEventListener("submit", async (event) => {
    //förhindrar att formuläret laddas om
    event.preventDefault();
    //validerar inmatningen, hämtar recept om något fyllts i fältet
    if (validateInput() === true){
        // väntar in svaret från fetchRecipes och sparar det i en variabel
        const recipeData = await fetchRecipes(inputEl);
        //skickar med objektet från receptdatabasen som argument i createRecipeObj()
        createRecipeObj(recipeData);
    }


} )

