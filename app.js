"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchObj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.getElementById("gender").value,
    eyeColor: document.getElementById("eyeColor").value,
    occupation: document.getElementById("occupation").value,
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
  };
  // var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  // switch(searchType){
  switch(true) {
    case searchObj.firstName != "":
    searchByName(people, searchObj, people);
    break;
    case searchObj.lastName != "":
    searchByName(people, searchObj, people);
    // case 'no':
    // searchByTraits(people);
    // break;
    default:
    searchByTraits(people, searchObj, people);
    break;
  }
}

function searchByTraits(people, searchObj, completeData) {
  // let searchMethod = prompt("How many traits would you like to search by? Please enter either 1 or 'more'.");
  //   switch (true) {
  //     case (searchMethod == 1):  
  //       let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
        let filteredPeople = [];
  
          switch (true) {
            case searchObj.height != "":
              filteredPeople = searchByHeight(people, searchObj, completeData);
              break;
            case searchObj.weight != "":
              filteredPeople = searchByWeight(people, searchObj, completeData);
              break;
            case searchObj.eyeColor != "":
              filteredPeople = searchByEye(people, searchObj, completeData);
              break;
            case searchObj.gender != "":
              filteredPeople = searchByGender(people, searchObj, completeData);
              break;
            case searchObj.age != "":
              filteredPeople = searchByAge(people, searchObj, completeData);
              break;
            case searchObj.occupation != "":
              filteredPeople = searchByJob(people, searchObj, completeData);
              break;
            // default:
            //   alert("You entered an invalid search type! Please try again.");
            //   searchByTraits(people);
            //   break;
          };
      // case (searchMethod == 'more'):
      //   searchByMultTraits(people);
      //   break;
    //   default:
    //     alert("You entered an invalid answer. Please try again.");
    //     searchByTraits(people);
    //     break;  
    // } 
  // let foundPerson = filteredPeople[0];

  return displayFiltered(people, searchObj, completeData);
}


function searchByMultTraits (people) {
  let results = [];
  let userTraitChoice = prompt("You can search by the following Trait Types: Height, Weight, Eye Color, Age, Gender or Occupation. Please enter a Trait Type. EXAMPLE: 'eye color'. Enter 'done' to stop filtering and get results.");
  let userSearchValue = prompt("Please enter the " + userTraitChoice + " of the person you are looking for. EX: 'blue'.")
  // let searchProperties = [userTraitChoice.split(",")];
  // let searchKey = searchProperties.shift();
  // let searchValue = searchProperties[1];
  if (results.length == 0) {
    results = people.filter(function(el) {
      return(el[userTraitChoice] == userSearchValue); 
    });
  }
  if (results.length > 0) {
    results.filter(function(el) {

    });
  }
  if (userTraitChoice.toLowerCase == "done")
    mainMenu(results, people);
  }

function searchByHeight(people, searchObj, completeData) {
  let userInputHeight = searchObj.height;

  let newArray = people.filter(function (el) {
    return el.height == userInputHeight;
  });
  searchObj.height = "";
  searchByTraits(newArray, searchObj, completeData);
}

function searchByWeight(people, searchObj, completeData) {
  let userInputWeight = searchObj.weight;

  let newArray = people.filter(function (el) {
    return el.weight == userInputWeight;
  });
  searchObj.weight = "";
  searchByTraits(newArray, searchObj, completeData);
}

function searchByEye (people, searchObj, completeData) {
  let userInputEye = searchObj.eyeColor;

  let newArray = people.filter(function (el) {
    return el.eyeColor == userInputEye;
  });
  searchObj.eyeColor = "";
  searchByTraits(newArray, searchObj, completeData);
}

function searchByGender (people, searchObj, completeData) {
  let userInputGender = searchObj.gender;

  let newArray = people.filter(function (el) {
    return el.gender == userInputGender;
  });
  searchObj.gender = "";
  searchByTraits(newArray, searchObj, completeData);
}

function searchByAge (people, searchObj, completeData) {
  let userInputAge = searchObj.age;
  
  let newArray = people.filter(function (person) {
    let age = getAgeNoI(person);
    if(age == userInputAge) {
      return true;
    }
  });
  searchObj.age = "";
  searchByTraits(newArray, searchObj, completeData);
}

function searchByJob (people, searchObj, completeData) {
  let userInputJob = searchObj.occupation;

  let newArray = people.filter(function (el) {
    return el.occupation == userInputJob;
  });
  searchObj.occupation = "";
  searchByTraits(newArray, searchObj, completeData);
}

function displayFiltered (people, searchObj, completeData) {
  // let i = data.findIndex(filteredPpl => filteredPpl === filteredPpl);
  if (people.length > 1) {
    let list = people.map(function (el) {
      return " " + el.firstName + " " + el.lastName;
    })
    let userInputFirst = prompt("Found" + " " + list + "\n" + "Please enter the FIRST NAME of who you would like to select.");
    let userInputLast = prompt("Found" + " " + list + "\n" + "Please enter the LAST NAME of who you would like to select.");
    let filteredPerson = people.filter(function(ind) {
      return ind.firstName == userInputFirst && ind.lastName == userInputLast;
      });
        mainMenu(filteredPerson, people);
  }

  else if (people.length == 1) {
    mainMenu(people, completeData);
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
    getImFam (person, people);
    break;
    case "descendants":
    getDescendants(cullPersonsIds(person), people);
    //displayPeople(list);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return;
    break; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people, searchObj, completeData){
  var firstN = searchObj.firstName;
  var lastName = searchObj.lastName;
  // let results = [];
      if (firstN === "") {
        let results = people.filter(function (el) {
          return el.lastName === lastName;
        });
        searchByTraits(results, searchObj, people);
      }
      if (lastName === "") {
        let results = people.filter(function (el) {
          return el.firstName === firstN;
        });
        searchByTraits(results, searchObj, people);
      }
      else if (firstN != null && lastName != null) {
        let results = people.filter(function (el) {
          return el.firstName === firstN && el.lastName === lastName;
        });
        searchByTraits(results, searchObj, people);
      }
    
    }

  
// WHAT'S THIS?
//   let firstN = promptFor("What is the person's first name?", chars);
//   let lastName = promptFor("What is the person's last name?", chars);
//   let results = [];
//     for (let i = 0; i < people.length; i++){
//       if (people[i].firstName.toLowerCase() === firstN.toLowerCase() && people[i].lastName.toLowerCase() === lastName.toLowerCase()){
//         results.push(people[i]);
//       }
//     }
//     mainMenu(results, people);
// }

  
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
}

function getAgeNoI (person) {
  let birthDate = new Date(person.dob);
  let today = new Date();
  let ageYears = (today.getFullYear() - birthDate.getFullYear());
    if (today.getMonth() < birthDate.getMonth() || today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
      ageYears--;
    }
  return ageYears;
}

// retrieve "by blood" family, USE RECURSION to go through desOb array to find grandkids etc.

// TODO: figure out how to move through the indexes of "person" (i++) 
//issue with desNames array having 0 in front -- currently not carrying names over in new iteration 

function cullPersonsIds(persons, idsArray = []){
  persons.map(function(persons){
    idsArray.push(persons.id);
    return;    
  })
return (persons, idsArray);
}

function getDescendants(personsIds, people, descendants = []){
  let originalLength = personsIds.length;
  let nextGen = [];
  for(let j = 0; j < originalLength; j++){
    for(let i = 0; i < people.length; i++){
      if(personsIds[0] == people[i].parents[0] || personsIds[0] == people[i].parents[1]){
        descendants.push(people[i]);
        nextGen.push(people[i]);
      }      
    }
  personsIds.shift();
  }
  if(!nextGen.length){
    displayPeople (descendants);
  }
  else{
  getDescendants(cullPersonsIds(nextGen), people, descendants);
  }
}

// retrieve immediate family (parents, siblings, current spouse, kids), USE ITERATION//
function getImFam (person, people) {
let i = data.findIndex(person => person === person);
let family = {};
family["parents"] = people.filter(function(el) {
  return person[i].parents[0] == el.id || person[i].parents[1] == el.id;
});
  if (family.parents.length === 0) {
    family.parents = "Not available."
  }
  if(family.parents == "Not available."){
      family["siblings"] = "Not available.";
  }
  else {
    family["siblings"] = people.filter(function(el) {
  for (let j = 0; j < family.parents.length; j++) {
    if (family.parents[j] == el.parents[0] || family.parents[j] == el.parents[1]) {
      return true;
    }
  }
  });
  }

family["spouse"] = person[i].currentSpouse;
if (family.spouse = null) {
  family.spouse = "None"
}
else {
  
}


family["kids"] = people.filter(function(el) {
  return el.parents[0] == person[i].id || el.parents[1] == person[i].id;
})

}

function displayImFam(person, parents, ) {

}

function displayPeople (list){
  alert(list.map(function(person){
    return person.firstName + " " + person.lastName;
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
