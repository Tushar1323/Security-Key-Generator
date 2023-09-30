// For selecting element by custom attribute we "[ ]"

// Body 
const bodyy = document.querySelector('body');
// slider
const inputSlider = document.querySelector("[data-lengthSlider]");
// Length number display eg 10
const lengthDisplay = document.querySelector("[data-lengthNumber]");
// input readonly
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
// copy button
const copyBtn = document.querySelector("[data-copy]");
// copied msg pop up
const copyMsg = document.querySelector("[data-copyMsg]");
// uppercase checkbox
const uppercaseCheck = document.querySelector("#uppercase");
// lowercase checkbox
const lowercaseCheck = document.querySelector("#lowercase");
// numbers checkbox
const numbersCheck = document.querySelector("#numbers");
// symbols checkbox
const symbolsCheck = document.querySelector("#symbols");
// password strength circle
const indicator = document.querySelector("[data-indicator]");
// Generate Password Button
const generateBtn = document.querySelector(".generateButton");
// selecting all checkbox
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// symbol string that will use in generating the password
const symbols = '~!@#$%^&*_=<>.?/';
// selecting the shaking div
const displayContainer = document.querySelector(".display-container");

//initially
let password = "";
let passwordLength = 7;
//set strength circle color to grey
setIndicator("#808080");

//setting initial passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
//   the lower code is for color filling of slider when we move the slider
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}
handleSlider();

// function for setting the circle color
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = "0px 0px 15px 3px hsl(176, 100%, 44%)";
}

// Generating randow number from min to max
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Randow number
function generateRandomNumber() {
  return getRndInteger(0, 10);
}

// Generate lowerletter character
function generateLowerCase() {
  // ascii value to char
  return String.fromCharCode(getRndInteger(97, 123));
}

// Generate Upperletter character
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
// Generate Symbol
function generateSymbol() {
  const Num = getRndInteger(0, symbols.length);
  // char at is used for getting the character of string
  return symbols.charAt(Num);
}

// strength indicating by circle
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper &&hasLower && (hasNum || hasSym) &&passwordLength >= 6) {
    setIndicator("#80FF00");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#FF8000");
  } else {
    setIndicator("#FF0000");
  }
}

// copying the content in clipboard and showing the msg copied
async function copyContent() {
  try {
    // wait untill the executation
    await navigator.clipboard.writeText(passwordDisplay.value);
    // setting the text inside the copymsg
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }

  //to make copy wala span visible
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

// For Shuffling the password at last of generation ---------------------
function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swapping the char value
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
// -------------------------------------------------------------------------

let checkCount = 0;
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

// counting the number of checkbox checked
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  if(checkCount==0){
    passwordDisplay.value = "";
  }
  //special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

// slider value is using -->
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

// clicking on the copy bnt to copied the password
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

// color variable declaration
var color=1;

// Clicking on the generate btn
generateBtn.addEventListener("click", () => {
  //none of the checkbox are selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // let's start the jouney to find new password
  console.log("Starting the Journey");

  //remove old password
  password = "";

  // funcArr is array
  let funcArr = [];

  // In js we can call function without paranthesis
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);

  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);

  if (numbersCheck.checked) funcArr.push(generateRandomNumber);

  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  //compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i](); // Revision why
  }
  console.log("Compulsory adddition done");

  //remaining adddition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex " + randIndex);
    console.log(funcArr[randIndex]());
    password += funcArr[randIndex]();
  }
  console.log("Remaining adddition done");
  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling done");
  //show in UI
  passwordDisplay.value = password;
  console.log("UI adddition done");
  //calculate strength
  calcStrength();

  // Add the 'shaking' class to trigger the animation
  displayContainer.classList.add("shaking");

  // After the animation duration (0.7s), remove the class to reset it
  setTimeout(() => {
    displayContainer.classList.remove("shaking");
  }, 700); // Adjust the duration to match your animation
  
    switch (color) {
      case 1: {
        var col1 = "linear-gradient(31deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col1;
        color++;
        break;
      }
      case 2: {
        var col2 = " linear-gradient(60deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col2;
        color ++;
        break;
      }
      case 3: {
        var col3 = "linear-gradient(89deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col3;
        color++;
        break;
      }
      case 4: {
        var col4 = "linear-gradient(116deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col4;
        color++;
        break;
      }
      case 5: {
        var col5 = "linear-gradient(146deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col5;
        color++;
        break;
      }
      case 6: {
        var col6 = "linear-gradient(178deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col6;
        color++;
        break;
      }
      case 7: {
        var col7 = "linear-gradient(207deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col7;
        color++;
        break;
      }
      case 8: {
        var col8 = "linear-gradient(237deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col8;
        color++;
        break;
      }
      case 9: {
        var col9 = "linear-gradient(268deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col9;
        color++;
        break;
      }
      case 10: {
        var col10= "linear-gradient(299deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%);";
        document.body.style.background = col10;
        color++;
        break;
      }
      case 11: {
        var col11 = "linear-gradient(331deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%)";
        document.body.style.background = col11;
        color++;
        break;
      }
      case 12: {
        var col12 = "linear-gradient(359deg, rgba(188, 0, 255, 1) 0%, rgba(53, 15, 119, 1) 100%);";
        document.body.style.background = col12;
        color=1;
        break;
      }
    }
});
