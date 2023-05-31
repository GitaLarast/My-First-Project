const menu = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-square-xmark");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-square-xmark");
  navbar.classList.remove("active");
};

// click outside sidebar, navbar disappear
document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("active");
    menu.classList.remove("fa-square-xmark");
  }
});

/*
function calculateDosage() {
  var doseInput = parsefloat(document.getElementById("doseInput").value;
  var weightInput = document.getElementById("weightInput").value;
  var massInput = document.getElementById("massInput").value;
  var volumeInput = document.getElementById("volumeInput").value;
  var doseUnit = document.getElementById("doseUnit").value;
  var weightUnit = document.getElementById("weightUnit").value;
  var massUnit = document.getElementById("massUnit").value;
  var volumeUnit = document.getElementById("volumeUnit").value;

  var resultElement = document.getElementById("result");

  // Convert weight to grams for calculation
  let weightInGrams = weight;
  switch (weightUnit) {
    case "kg":
      weightInGrams *= 1000;
      break;
    case "lbs":
      weightInGrams *= 453.592;
      break;
    case "g":
      break;
    case "dag":
      weightInGrams /= 10;
      break;
    case "oz":
      weightInGrams *= 28.3495;
      break;
    default:
      console.log("Invalid weight unit");
      return;
  }

  if (doseInput.trim() !== "" && weightInput.trim() !== "") {
    // parses a value as a string and returns the first number.
    var dose = parseFloat(doseInput);
    var weight = parseFloat(weightInput);
    var mass = parseFloat(massInput);
    var volume = parseFloat(volumeInput);

    if (!isNaN(dose) && !isNaN(weight) && !isNaN(mass) && !isNaN(volume) && dose > 0 && weight > 0 && mass > 0 && volume > 0) {
      var calculatedDosage = (weight * dose * volume) / mass;
      resultElement.textContent = "The calculated dosage is: " + calculatedDosage.toFixed() + " mg.";
    } else {
      resultElement.textContent = "Please enter valid numeric values for dose and weight";
    }
  } else {
    resultElement.textContent = "Please enter the patient weight and prescribed dose.";
  }
}

*/

function calculateDose() {
  const weight = parseFloat(document.getElementById("weightInput").value);
  const weightUnit = document.getElementById("weightUnit").value;
  const dose = parseFloat(document.getElementById("doseInput").value);
  const doseUnit = document.getElementById("doseUnit").value;
  const mass = parseFloat(document.getElementById("massInput").value);
  const massUnit = document.getElementById("massUnit").value;
  const volume = parseFloat(document.getElementById("volumeInput").value);
  const volumeUnit = document.getElementById("perUnit").value;
  const frequency = document.getElementById("freqUnit").value;

  const resultElement = document.getElementById("result");

  // Convert weight to kilograms for calculation
  let weightInKg = weight;
  switch (weightUnit) {
    case "g":
      weightInKg /= 1000;
      break;
    case "lbs":
      weightInKg *= 0.453592;
      break;
    case "kg":
      break;
    case "dag":
      weightInKg /= 100;
      break;
    default:
      console.log("Invalid weight unit");
      return;
  }

  // Convert concentration to milligrams for calculation
  let massInMilligrams = mass;
  switch (massUnit) {
    case "mg":
      break;
    case "µg":
      massInMilligrams /= 1000;
      break;
    case "g":
      massInMilligrams *= 1000;
      break;
    default:
      console.log("Invalid mass unit");
      return;
  }

  // Convert volume to milliliters for calculation
  let volumeInMilliliters = volume;
  switch (volumeUnit) {
    case "ml":
      break;
    case "mm³":
      volumeInMilliliters /= 1000;
      break;
    case "cm³":
      break;
    default:
      console.log("Invalid volume unit");
      return;
  }

  // Calculate the dose based on weight, concentration, and volume
  let doseInMiligrams = dose;
  switch (doseUnit) {
    case "mg/day":
      break;
    case "mcg/day":
      doseInMiligrams /= 1000;
      break;
    default:
      console.log("Invalid dose unit");
      return;
  }

  // Calculate the number of doses per day based on frequency
  let numberOfDoses = frequency;
  switch (frequency) {
    case "Once per day":
      numberOfDoses = 1;
      break;
    case "Two times per day":
      numberOfDoses = 2;
      break;
    case "Three times per day":
      numberOfDoses = 3;
      break;
    case "Four times per day":
      numberOfDoses = 4;
      break;
    default:
      console.log("Invalid frequency");
      return;
  }

  if (!isNaN(dose) && !isNaN(weight) && !isNaN(mass) && !isNaN(volume) && dose > 0 && weight > 0 && mass > 0 && volume > 0) {
    const calculatedDoseMass = weightInKg * doseInMiligrams;
    const calculatedDoseVolume = (weightInKg * doseInMiligrams * volumeInMilliliters) / massInMilligrams;
    // Calculate each dosage to be taken
    const eachDoseMass = calculatedDoseMass / numberOfDoses;
    const eachDoseVolume = calculatedDoseVolume / numberOfDoses;
    resultElement.setAttribute("style", "white-space: pre;");
    resultElement.textContent = "The calculated dosage for children with weight of " + weightInKg + " kg is " + calculatedDoseMass.toFixed() + " mg/day or " + calculatedDoseVolume.toFixed() + " mL/day. \r\n";
    resultElement.textContent += "For drug concentration of " + mass + " " + massUnit + " per " + volume + " " + volumeUnit + ": \r\n";
    resultElement.textContent += "Each dose is " + eachDoseMass + " " + massUnit + " or " + eachDoseVolume + " " + volumeUnit + ", to be taken " + frequency + ".";
  } else {
    resultElement.textContent = "Please enter valid numeric values for dose and weight";
  }
}
