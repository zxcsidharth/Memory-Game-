const gameContainer = document.getElementById("game");
var divElementArray = [];
var count = 0;
var i = 0; //for array indexing
var score = 1;
var formData;

var COLORS = [];

function checkNumbers() {
  let message = document.getElementById("warning");
  numbers = document.getElementById("cards").value;
  formData = numbers;
  if (numbers % 2 == 0) {
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").style.backgroundColor =
      "rgb(84, 202, 84)";
    message.style.display = "none";
    const colors = generateRandomColors(numbers / 2);
    let colorCount = 0;
    let loopCount = 0;
    while (loopCount < 2 && colorCount < numbers) {
      for (let i = 0; i < colors.length; i++) {
        COLORS.push(colors[i]);
        colorCount++;
      }
      loopCount++;
    }

    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  } else {
    message.innerText = "please enter an even number";
    message.style.color = "red";
    message.style.fontSize = "15px";
  }
}

function generateRandomColors(numOfColors) {
  let colorCode = {};
  let letters = "0123456789ABCDEF";
  for (let j = 0; j < numOfColors; j++) {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (colorCode[color] === 1) {
      numOfColors++;
    } else {
      colorCode[color] = 1;
    }
  }
  return Object.keys(colorCode);
}
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    console.log(newDiv);
    newDiv.style.backgroundColor = "white";
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (count < formData - 1) {
    divElementArray.push(event.target.className);
    if (event.target.style.backgroundColor === "white") {
      count++;
      console.log(event.target.style.backgroundColor, divElementArray[i]);
      event.target.style.backgroundColor = divElementArray[i++];
      let scoreVal = document.getElementById("score");
      scoreVal.innerText = score++;
    } else {
      divElementArray.pop();
    }
    if (
      divElementArray.length === 2 &&
      divElementArray[0] === divElementArray[1]
    ) {
      divElementArray.splice(0, 2);
      i = 0;
    } else if (
      divElementArray.length === 2 &&
      divElementArray[0] !== divElementArray[1]
    ) {
      setTimeout(() => {
        let firstElement = document.getElementsByClassName(
          divElementArray[0]
        )[0];
        let secondElement = document.getElementsByClassName(
          divElementArray[1]
        )[0];
        firstElement.style.backgroundColor = "white";
        secondElement.style.backgroundColor = "white";
        firstElement = document.getElementsByClassName(divElementArray[0])[1];
        secondElement = document.getElementsByClassName(divElementArray[1])[1];
        firstElement.style.backgroundColor = "white";
        secondElement.style.backgroundColor = "white";
        divElementArray.splice(0, 2);
        count = count - 2;
        i = 0;
        // console.log(firstElement, secondElement);
      }, 500);
    }
  } else {
    let lastDiv = document.getElementsByClassName(event.target.className);
    console.log(lastDiv);
    if (lastDiv[0].style.backgroundColor !== event.target.className) {
      lastDiv[0].style.backgroundColor = event.target.className;
    } else {
      lastDiv[1].style.backgroundColor = event.target.className;
    }
    count = formData;
    const bestScore = findBestScore();
    alert(
      "Game Over ! Your Score is " +
        score +
        " and your best score is " +
        bestScore
    );
  }
}
function findBestScore() {
  //creating local storage for storing the best score
  let minScore = 0;
  if (localStorage.getItem("bestScore") === null) {
    localStorage.setItem("bestScore", "1000");
    return score;
  } else {
    minScore = localStorage.getItem("bestScore");
    if (score < parseInt(minScore)) {
      minScore = score;
      localStorage.setItem("bestScore", minScore);
      return minScore;
    }
    return minScore;
  }
}

function checkGameCount() {
  if (count > 9) {
    document.location.href = "index.html";
  } else {
    confirm("first finish the game");
  }
}
