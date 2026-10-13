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
//Deklarerar ett objekt som den information vi hämtar från APIn kommer att lagras i
let recipeObj = {};

//validerar det som matats in i sök-fältet
// tillräckligt lite kod för att jag inte ska vilja ha separat display-error-funktion - OK
function validateInput(){
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

//hämtar API 
async function fetchRecipes (searchPhrase) {
    //körs först
    try {
        //skapar en url med sökordet från formuläret
        const url = `https://dummyjson.com/recipes/search?q=${searchPhrase.value}&limit=1`;
        //await = väntar på att APIn ska hämtas
        const response = await fetch(url);
       //omvandlar till js
        const data = await response.json();

        //returnerar data
        return data;
    } 
    //fångar upp eventuella fel
    catch (error){
        //skriver ut på sidan så att användaren kan läsa det
        errorSection.innerHTML = "<p>Det gick inte att hämta sidan. Försök igen senare.</p>"
        //ger mer information om felet i konsollen
        console.log("Fel vid hämtning av API", error);
        throw error;
    }
}

//kollar om sökordet får något matchande recept
function matchingRecipe (searchPhrase){
     //om det inte finns något innehåll är det 0 värden i arrayen och vi returnerar false
     if(searchPhrase.recipes.length === 0){
        //skriver ut på sidan
        errorSection.innerHTML = "<p>Det finns inget matchande recept. Prova ett annat sökord</p>"
        return false;
     } else {
        return true;
     }
}


//börjar med att hitta rätt info i arrayen vi får tillbaka och lägger in det i ett objekt
function createRecipeObj (recipeToBeDisplayed){

    recipeObj = {
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

   // recipeSection elementet som är html-sektionen
   const articleEl = document.createElement("article");
   const h3El = document.createElement("h3");
   const imgEl = document.createElement("img");
   const divEl = document.createElement("div");
   const h4IngredientsEl = document.createElement("h4");
   const h4InstructionEl = document.createElement("h4");
   const ulEl = document.createElement("ul");
   const olEl = document.createElement("ol");

   //lägger till <article></article> i <section id="recipe">
   recipeSection.appendChild(articleEl);
   //lägger till h3 i <article></article>
   articleEl.appendChild(h3El);
   h3El.innerHTML = recipeObj.name;

   //lägger till bilden samt sökväg (hämtas från objektet) och alt.beskriving (så gott det går)
   articleEl.appendChild(imgEl);
   imgEl.src = recipeObj.image;
   imgEl.alt = `Serveringsförslag på den lagade rätten ${recipeObj.name}`;

   //lägger till en div i article, ger den en klass och lägger in p+innehåll direkt som innerHTML
   articleEl.appendChild(divEl);
   divEl.classList.add("recipe-info");
   divEl.innerHTML = `<p><strong>Servings:</strong> ${recipeObj.servings}</p>`;
    divEl.innerHTML += `<p><strong>Prep time::</strong> ${recipeObj.prepTimeMinutes}</p>`;
    divEl.innerHTML += `<p><strong>Cooking time:</strong> ${recipeObj.cookTimeMinutes}</p>`;
    divEl.innerHTML += `<p><strong>Difficulty:</strong> ${recipeObj.difficulty}</p>`;

    //skapar rubrik och lägger till text
    articleEl.appendChild(h4IngredientsEl);
    h4IngredientsEl.textContent = "Ingredients";

    //lägger till <ul></ul> i article och loopar igenom ingredients-arrayen, skriver ut varje ingrediens i ett li-element
    articleEl.appendChild(ulEl);
    for (let i = 0; recipeObj.ingredients[i]; i++){
        ulEl.innerHTML += `<li>${recipeObj.ingredients[i]}</li>`;
    }

    //skapar rubrik och lägger till text
    articleEl.appendChild(h4InstructionEl);
    h4InstructionEl.textContent = "Instructions";

    //lägger till <ol></ol> i article och loopar igenom instructions-arrayen, skriver ut varje instruktion i ett li-element
    articleEl.appendChild(olEl);
    for (let i = 0; recipeObj.instructions[i]; i++){
        olEl.innerHTML += `<li>${recipeObj.instructions[i]}</li>`;
    }
}

//tar bort alla felmeddelanden
function emptyPage (){
    recipeSection.innerHTML = "";
    errorSection.innerHTML = "";
    errorEl.innerHTML = "";
}

//läser in det som skrivs i sökfältet. Även detta en async-funktion, annars får jag bara "promise" från fetchRecipes. 
form.addEventListener("submit", async (event) => {
    //förhindrar att formuläret laddas om
    event.preventDefault();
    
    //tömmer hela sidan på ev. felmeddelanden och tidigare recept. Detta sker alltså på varje "sök"
    emptyPage();

    //validerar inmatningen, hämtar recept om något fyllts i fältet
    const recipeData = await fetchRecipes(inputEl);

console.log(recipeData);

    //kollar om det har skrivits något i fältet
    if (validateInput() === true ){
       //sedan kontrollerar vi att sökordet matchar ett recept
        if(matchingRecipe(recipeData) === true){
            //skapar ett objekt med hämtad data och skriver ut det
            createRecipeObj(recipeData);
            displayRecipe();
        }
        } 
    } )

