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
// tillräckligt lite kod för att jag inte ska vilja ha separat display-error-funktion
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

//läser in det som skrivs i sökfältet
form.addEventListener("submit", (event) => {
    //förhindrar att formuläret laddas om
    event.preventDefault();
    //validerar inmatningen
    validateInput();
} )

