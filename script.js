const gameContainer = document.getElementById("game");
var divElementArray = [];
var count = 0;
var i = 0;  //for array indexing
var score = 1;
var formData;

var COLORS = [];


function checkNumbers() {
  let message = document.getElementById('warning');
  numbers = document.getElementById('cards').value;
  formData = numbers;
  if(numbers % 2 == 0) {
    document.getElementById('submit').disabled = true;
    document.getElementById('submit').style.backgroundColor = 'rgb(84, 202, 84)';
    message.style.display = 'none';
    const colors = generateRandomColors(numbers/2);
    let colorCount = 0;
    let loopCount = 0;
    while(loopCount < 2 && colorCount < numbers) {
      for(let i = 0; i<colors.length; i++){
        COLORS.push(colors[i]);
        colorCount++;
      }
      loopCount++;
    }

    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  } else {
    message.innerText = 'please enter an even number';
    message.style.color = 'red';
    message.style.fontSize = '15px';
  }
  // console.log(COLORS);
}

function generateRandomColors(numOfColors) {
  let colorCode = {};
  let letters = '0123456789ABCDEF';
  for(let j = 0; j < numOfColors; j++) {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if(colorCode[color] === 1) {
      numOfColors++;
    } else {
      colorCode[color] = 1;
    }
  }
  return Object.keys(colorCode);
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    
    newDiv.classList.add(color);
    console.log(newDiv);
    newDiv.style.backgroundColor = 'white';
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(count < formData - 1) {
    divElementArray.push(event.target.className);
    // console.log(event.target.style.backgroundColor);
    if(event.target.style.backgroundColor === 'white') {
      count++;
      console.log(event.target.style.backgroundColor, divElementArray[i]);
      event.target.style.backgroundColor = divElementArray[i++];
      let scoreVal = document.getElementById('score');
      scoreVal.innerText = score++;
    } else {
      divElementArray.pop();
    }
    if(divElementArray.length === 2 && divElementArray[0] === divElementArray[1]){
      divElementArray.splice(0, 2);
      i = 0;
    } else if(divElementArray.length === 2 && divElementArray[0] !== divElementArray[1]) {
      setTimeout(()=> {
        let firstElement = document.getElementsByClassName(divElementArray[0])[0];
        let secondElement = document.getElementsByClassName(divElementArray[1])[0];
        firstElement.style.backgroundColor = 'white';
        secondElement.style.backgroundColor = 'white';
        firstElement = document.getElementsByClassName(divElementArray[0])[1];
        secondElement = document.getElementsByClassName(divElementArray[1])[1];
        firstElement.style.backgroundColor = 'white';
        secondElement.style.backgroundColor = 'white';
        divElementArray.splice(0, 2);
        count = count - 2;
        i = 0;
        // console.log(firstElement, secondElement);
        }, 500)
    }
  } else {
    let lastDiv = document.getElementsByClassName(event.target.className);
    console.log(lastDiv);
    if(lastDiv[0].style.backgroundColor !== event.target.className) {
      lastDiv[0].style.backgroundColor = event.target.className;
    } else {
      lastDiv[1].style.backgroundColor = event.target.className;
    }
    count = formData;
    const bestScore = findBestScore();
    alert("Game Over ! Your Score is "+score+" and your best score is "+bestScore);
  }
}
function findBestScore() {    //creating local storage for storing the best score
  let minScore = 0;
  if(localStorage.getItem("bestScore") === null) {
    localStorage.setItem("bestScore", "1000");
    return score;
  } else {
    minScore = localStorage.getItem("bestScore");
    if(score < parseInt(minScore)){
      minScore = score
      localStorage.setItem("bestScore", minScore);
      return minScore;
    }
    return minScore;
  }
}

function checkGameCount() {
  if(count > 9) {
    document.location.href = 'index.html';
  } else {
    confirm('first finish the game');
  }
}

// when the DOM loads
// createDivsForColors(shuffledColors);
