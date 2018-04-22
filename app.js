"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEye(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByJob(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is this person (inches)?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  displayFiltered(newArray, people);
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  displayFiltered(newArray, people);
}

function searchByEye (people) {
  let userInputEye = prompt("What color eyes does the person have?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEye) {
      return true;
    }
  });
  displayFiltered(newArray, people);
}

function searchByGender (people) {
  let userInputGender = prompt("Is this person a female or a male?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  displayFiltered(newArray, people);
}

function searchByAge (people) {
  let userInputAge = prompt("How old is this person (in years)?");
  
  let newArray = people.filter(function (person) {
    let age = getAge(person);
    if(age == userInputAge) {
      return true;
    }
  });
  displayFiltered(newArray, people);
}

function searchByJob (people) {
  let userInputJob = prompt("What is this person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputJob) {
      return true;
    }
  });
  displayFiltered(newArray, people);
}

function displayFiltered (filteredPpl, people) {
  if (filteredPpl.length > 1) {
    let list = filteredPpl.map(function (el) {
      return " " + el.firstName + " " + el.lastName;
    })
    let userInputFirst = prompt("Found" + " " + list + "\n" + "Please enter the FIRST NAME of who you would like to select.");
    let userInputLast = prompt("Found" + " " + list + "\n" + "Please enter the LAST NAME of who you would like to select.");
    let filteredPerson = filteredPpl.filter(function(el) {
      if(el.firstName == userInputFirst && el.lastName == userInputLast){
        return true;
      }
    })
    mainMenu(filteredPerson, people);
    }
  else if (filteredPpl.length == 1) {
    mainMenu(filteredPpl, people);
  }
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person.length){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let i = data.findIndex(person => person === person);
  var displayOption = prompt("Found " + person[i].firstName + " " + person[i].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    getDescendants(person, people);
    //displayPeople(list);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstN = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let results = [];
    for (let i = 0; i < people.length; i++){
      if (people[i].firstName.toLowerCase() === firstN.toLowerCase() && people[i].lastName.toLowerCase() === lastName.toLowerCase()){
        results.push(people[i]);
      }
    }
    mainMenu(results, people);
}
  
  
  // TODO: find the person using the name they entered


/// tested - functioning /// WHY VIA "INFO" NEED [i], BUT VIA SEARCH BY AGE DOESN'T WORK WITH [i](array)?!
function getAge (person) {
  let i = data.findIndex(person => person === person);
  let birthDate = new Date(person[i].dob);
  let today = new Date();
  let ageYears = (today.getFullYear() - birthDate.getFullYear());
    if (today.getMonth() < birthDate.getMonth() || today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
      ageYears--;
    }
  return ageYears;

  // let birthDate = new Date(person.dob);
  // let today = new Date();
  // let ageYears = (today.getFullYear() - birthDate.getFullYear());
  //   if (today.getMonth() < birthDate.getMonth() || today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
  //     ageYears--;
  //   }
  // return ageYears;
}

// retrieve "by blood" family, USE RECURSION to go through desOb array to find grandkids etc.

// TODO: figure out how to move through the indexes of "person" (i++) 
//issue with desNames array having 0 in front -- currently not carrying names over in new iteration


function getDescendants(person, people, descendants = []){
  let personId = person.map(pluck => pluck.id);
  for(let i = 0; i < people.length; i++){
      if(personId == people[i].parents[0] || personId == people[i].parents[1]){
          descendants.push(people[i]);
      }
  }
  return getDescendants(person, people, descendants);
}

/*
function getDescendants (person, people, list, index = 0) {
  let i = index || data.findIndex(person => person === person);
  list = list || [];
  let desOb = [];
  let rentId = person[i].id;
  for (let j = 0; j < people.length && i < person.length; j++) {
    // if (people[j].parents == rentId) {
    //   list.push(people[j].firstName + " " + people[j].lastName);
    //   desOb.push(people[j]);
    // }
    desOb = people.filter(function (el) {
      if (el.id == rentId){
        return true;
      }
    })
    if (i < person.length && j === people.length) {
      // i++;
      getDescendants(desOb, people, list, i++);
    }
}

console.log(list)
}
*/

function displayDescendants (list){
  alert("")
}
// retrieve immediate family (parents, siblings, current spouse, kids), USE ITERATION//
function getImFam (person, people) {

}

// alerts a list of people
function displayPeople(people){
  let i = data.findIndex(person => person === person);
  alert(people.map(function(person){
    return person[i].firstName + " " + person[i].lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let age = getAge(person);
  let i = data.findIndex(person => person === person);
  var personInfo = "First Name: " + person[i].firstName + "\n";
  personInfo += "Last Name: " + person[i].lastName + "\n";
  personInfo += "DOB: " + person[i].dob + "\n";
  personInfo += "Age: " + age + "\n";
  personInfo += "Height: " + person[i].height + "in" + "\n";
  personInfo += "Weight: " + person[i].weight + "lbs" + "\n";
  personInfo += "Eye Color: " + person[i].eyeColor + "\n";
  personInfo += "Occupation: " + person[i].occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return input; // default validation only
}
