"use strict";

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
  switch(true) {
    case searchObj.firstName != "":
    searchByName(people, searchObj, people);
    break;
    case searchObj.lastName != "":
    searchByName(people, searchObj, people);
    default:
    searchByTraits(people, searchObj, people);
    break;
  }
}

function searchByTraits(people, searchObj, completeData) {
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
          };
  return displayFiltered(people, searchObj, completeData);
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
  if (people.length > 1) {
    let list = people.map(function (el) {
      return " " + el.firstName + " " + el.lastName;
    })
    let userInputFirst = prompt("Found" + " " + list + "\n" + "Please ENTER THE *FIRST NAME* of who you would like to select.");
    let userInputLast = prompt("Found" + " " + list + "\n" + "Please ENTER THE *LAST NAME* of who you would like to select.");
    if(userInputLast == null || userInputFirst == null){
      alert("Entered information does not match any of the people found.  Please try again.")
      displayFiltered(people, searchObj, completeData);
    }
    let filteredPerson = people.filter(function(ind) {
      return ind.firstName.toLowerCase() == userInputFirst.toLowerCase() && ind.lastName.toLowerCase() == userInputLast.toLowerCase();
      });
        mainMenu(filteredPerson, completeData);
  }

  else if (people.length == 1) {
    mainMenu(people, completeData);
  }
}

function mainMenu(person, people, completeData){
  if(!person.length){
    alert("Could not find that individual.");
    return app(people);
  }
  let i = data.findIndex(person => person === person);
  var displayOption = prompt("Found " + person[i].firstName + " " + person[i].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
      if(displayOption == null){
      alert("Entered information is not valid.  Please try again.")
      mainMenu(person, people, completeData);
    }
  displayOption = displayOption.toLowerCase();
  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    getImFam (person, people);
    break;
    case "descendants":
    getDescendants(cullPersonsIds(person), people);
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    break; 
    default:
    return mainMenu(person, people); 
  }
}

function searchByName(people, searchObj, completeData){
  var firstN = searchObj.firstName;
  var lastName = searchObj.lastName;
      if (firstN === "") {
        let results = people.filter(function (el) {
          return el.lastName.toLowerCase() === lastName.toLowerCase();
        });
        searchObj.lastName = "";
        searchByTraits(results, searchObj, people);
      }
      if (lastName === "") {
        let results = people.filter(function (el) {
          return el.firstName.toLowerCase() === firstN.toLowerCase();
        });
        searchObj.firstName = "";
        searchByTraits(results, searchObj, people);
      }
      else if (firstN != "" && lastName != "") {
        let results = people.filter(function (el) {
          return el.firstName.toLowerCase() === firstN.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase();
        });
        searchObj.firstName = "";
        searchObj.lastName = "";
        searchByTraits(results, searchObj, people);
      }
    
    }

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

function getParents (person, people) {
  let i = data.findIndex(person => person === person);
  let parents = people.filter(function(el) {
  return person[i].parents[0] == el.id || person[i].parents[1] == el.id;
});
    if (parents.length === 0) {
      parents = "Not available."
    }
    else {
    parents = parents.map(function (el) {
      return el.firstName + " " + el.lastName;
    })
    }
  return parents;
}

function getSiblings (person, people) {
    let i = data.findIndex(person => person === person);
    let siblings = people.filter(function(el) {
  for (let j = 0; j < person[i].parents.length; j++) {
    if (person[i].parents[j] == el.parents[0] || person[i].parents[j] == el.parents[1]) {
      return " " + el.firstName + " " + el.lastName;;
    }
  }
  });
    if (siblings.length === 0) {
      siblings = "Not available"
    }
    else if (siblings.length > 0) {
      siblings = siblings.filter(function(el) {
        return el.id != person[i].id;
      })
      siblings = siblings.map(function (el) {
      return el.firstName + " " + el.lastName;
    });
    }


  return siblings;
}

function getSpouse (person, people) {
  let i = data.findIndex(person => person === person);
  let spouse;
  if (person[i].spouse = null) {
  spouse = "None";
  }
  else spouse = people.filter(function(el) {
    return person[i].currentSpouse == el.id;
});
  if (spouse != "None") {
  spouse = spouse.map(function (el) {
      return el.firstName + " " + el.lastName;
    });
  }
return spouse; 
}

function getKids (person, people) {
  let i = data.findIndex(person => person === person);
  let kids = people.filter(function(el) {
  return el.parents[0] == person[i].id || el.parents[1] == person[i].id;
})
    if (kids.length === 0) {
      kids = "None"
    }
    else {
    kids = kids.map(function (el) {
      return el.firstName + " " + el.lastName;
    })
    }
  return kids;
}

function getImFam (person, people) {
let i = data.findIndex(person => person === person);
let family = {};
family["parents"] = getParents(person, people);
family["siblings"] = getSiblings(person, people);
family["spouse"] = getSpouse (person, people);
family["kids"] = getKids (person, people);
displayImFam(person, family);
}

function displayImFam(person, family) {
  let imFamInfo = "Parents: " + family.parents + "\n";
  imFamInfo += "Siblings: " + family.siblings + "\n";
  imFamInfo += "Spouse: " + family.spouse + "\n";
  imFamInfo += "Children: " + family.kids + "\n";
  alert(imFamInfo);
}

function displayPeople (list){
  if(list.length == 0){
    alert("Could not find any descendants.");
  }
  else{
  alert(list.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
}

function displayPerson(person){
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
  alert(personInfo);
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return input; 
}
