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
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
  var firstN = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let results = [];
    for (var i = 0; i < data.length; i++) {
      if (people[i].firstName === firstN && people[i].lastName === lastName) {
        results.push(people[i]);
      }
    }
    mainMenu(results, people);
    }

  
  
  // TODO: find the person using the name they entered
///not tested///
function getAge (person) {
  let i = data.findIndex(person => person === person);
  let birthDate = person[i].dob;
  let today = new Date();
      var thisYear = 0;
    if (today.getMonth() < birthDate.getMonth()) {
        thisYear = 1;
    } 
    else if ((today.getMonth() == birthDate.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    var age = today.getFullYear() - birthDate.getFullYear() - thisYear;
    return age;
  // let curYear = today.getFullYear();
  // let age = curYear - birthYear;
  // return age;
}

// retrieve "by blood" family, USE RECURSION//
function getDescendants (person, people) {

}

// retrieve immediate family (parents, siblings, current spouse, kids), USE ITERATION//
function getImFam (person, people) {

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
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
  personInfo += "Height: " + person[i].height + "\n";
  personInfo += "Weight: " + person[i].weight + "\n";
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
