# DT224G - Laboration 6 

**Detta är uppgiftsbeskrivningen från kursen:**

I denna laboration ska du skapa funktionaliteten till en receptsökare.

Du får färdiga HTML- och CSS-filer som utgör gränssnittet till applikationen. Din uppgift är att skriva JavaScript-koden som gör det möjligt för användaren att söka efter recept.

Receptdata ska hämtas från det externa APIet: DummyJSON Recipes. När användaren skriver en sökfras och skickar formuläret ska ett API-anrop göras där sökfrasen används i anropet.

Det första receptet i sökresultatet ska sedan presenteras på webbsidan.

Applikationen ska kunna:
* läsa den sökfras som användaren skriver i formuläret
* kontrollera att en sökfras har angetts
* göra ett asynkront API-anrop med fetch()
* använda async/await för att invänta och hantera svaret
* omvandla API-svaret från JSON
* kontrollera om sökningen gav något resultat
* presentera det första receptet från sökresultatet
* skapa receptets innehåll dynamiskt med JavaScript
* hantera fel som kan uppstå vid API-anropet
* ersätta tidigare recept när användaren gör en ny sökning
