require("isomorphic-fetch");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let faultyItems = document.getElementById("faultyItems");
  let launchStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
    alert("All fields are required!");
    return;
  }

  if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty") {
    alert("All fields are required!");
    return;
  }

  if (validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
    alert("All fields are required!");
    return;
  }

  if (validateInput(pilot) === "Not a Number" || validateInput(copilot) === "Not a Number") {
    alert("Pilot and copilot names must be filled in.");
    return;
  }

  if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    alert("Fuel level and cargo mass must be numbers.");
    return;
  }

  pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;

  if (fuelLevel < 10000) {
    faultyItems.style.visibility = "visible";
    fuelStatus.innerHTML = "There is not enough fuel for the journey.";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (cargoLevel > 10000) {
    faultyItems.style.visibility = "visible";
    cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    faultyItems.style.visibility = "hidden";
    launchStatus.innerHTML = "Shuttle is ready for launch";
    launchStatus.style.color = "green";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;