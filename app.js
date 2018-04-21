"use strict";

function runApp(arrayOfPeopleObjects){
	let searchType = getUserInput("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNoValidator).toLowerCase();
	switch(searchType){
		case 'yes':
		searchByName(arrayOfPeopleObjects);
		break;
		case 'no':
		searchByTraits(arrayOfPeopleObjects);
		break;
		default:
		alert("Wrong! Please try again, following the instructions dummy. :)");
		runApp(arrayOfPeopleObjects); // restart app
		break;
	}
}

function searchByName(arrayOfPeopleObjects){
	let firstNameVar = getUserInput("What is the person's first name?", chars);
	let lastNameVar = getUserInput("What is the person's last name?", chars);
	let searchByNameResults = [];
	for(let index = 0; index < arrayOfPeopleObjects.length; index++){
		if (arrayOfPeopleObjects[index].firstName.toLowerCase() === firstNameVar.toLowerCase() && arrayOfPeopleObjects[index].lastName.toLowerCase() === lastNameVar.toLowerCase()){
			searchByNameResults.push(arrayOfPeopleObjects[index]);
		}
	}
	mainMenu(searchByNameResults, arrayOfPeopleObjects);
}

function mainMenu(foundPersonObject, arrayOfPeopleObjects){

	if(!foundPersonObject){
	alert("Could not find that individual.");
	return runApp(arrayOfPeopleObjects);
	}
	let displayOption = prompt("Found " + foundPersonObject.map(pluck => pluck.firstName) + " " + foundPersonObject.map(pluck => pluck.lastName) + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
	switch(displayOption){
	case "info":
	break;
	case "family":
	break;
	case "descendants":
	getDescendants(foundPersonObject, arrayOfPeopleObjects);
	break;
	case "restart":
	runApp(arrayOfPeopleObjects);
	break;
	case "quit":
	return; // stop execution
	default:
	return mainMenu(foundPersonObject, arrayOfPeopleObjects);
	}
}

function getDescendants(foundPersonObject, arrayOfPeopleObjects, list, index = 0){
	for(let index = 0; index < arrayOfPeopleObjects.length; index++){
		if(foundPersonObject.map(pluck => pluck.id) === function parseParentArray(arrayOfPeopleObjects, index){
			for(let jindex = 0; jindex < arrayOfPeopleObjects[index].parents.length; jindex++){
				let foundAParent = arrayOfPeopleObjects[index].parents[jindex];
				return foundAParent;
			}
		}) 
	}
}

/*	let i = index || data.findIndex(person => person === person);
	list = list || [];
	let desOb = [];
	let rentId = person[i].id;
	for (let j = 0; j < people.length && i < person.length; j++){
		if (people[j].parents == rentId) {
			list.push(people[j].firstName + " " + people[j].lastName);
			desOb.push(people[j]);
		}
		if (i < person.length && j == people.length){
			i++;
		}
}
getDescendants(desOb, people, list, i);
console.log(list)
}
*/

function displayPeople(foundPersonObject){
	alert(foundPersonObject.map(function(personObject){
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

//	for(let index = 0; index < arrayOfPeopleObjects.length; index++){
