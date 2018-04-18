"use strict";

function runApp(arrayToBeSearched){
	let searchType = getUserInput("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNoValidator).toLowerCase();
	switch(searchType){
		case 'yes':
		searchByName(arrayToBeSearched);
		break;
	}
}

function searchByName(arrayToBeSearched){
	let firstNameVar = getUserInput("What is the person's first name?", chars);
	let lastNameVar = getUserInput("What is the person's last name?", chars);
	let searchByNameResults = [];
	for (let index = 0; index < arrayToBeSearched.length; index++){
		if (arrayToBeSearched[index].firstName.toLowerCase() === firstNameVar.toLowerCase() && arrayToBeSearched[index].lastName.toLowerCase() === lastNameVar.toLowerCase()){
			searchByNameResults.push(arrayToBeSearched[index]);
		}
	}
	displayPeople(searchByNameResults);
}

function displayPeople(arrayOfObjectsToBeSearched){
	alert(arrayOfObjectsToBeSearched.map(function(personObject){
		return personObject.firstName + " " + personObject.lastName;
	}).join("\n"));
}


// Later investigate why this variable blows up when declared using "Let" //
function getUserInput(promptMessage, inputValidator){
	do{
		var promptResponse = prompt(promptMessage).trim();
	}
	while(!promptResponse || !inputValidator(promptResponse));
	return promptResponse;
}

function yesNoValidator(promptResponse){
	return promptResponse.toLowerCase() === "yes" || promptResponse.toLowerCase() === "no";
}

function chars(input){
	return input;
}

function getObjectPropertyValueCaseInsensitive(objectToBeSearched, valueToBeSearched){
	return !!Object.values(objectToBeSearched).find(function(objectValue){
		return objectValue.toLowerCase() === valueToBeSearched.toLowerCase();
	})
}

