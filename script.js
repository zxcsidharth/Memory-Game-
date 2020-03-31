const gameContainer = document.getElementById("game");
var divElementArray = [];
var count = 0;
var i = 0;  //for array indexing

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(count < 9) {
    divElementArray.push(event.target.className);
    console.log(divElementArray[i]);
    if(event.target.style.backgroundColor !== divElementArray[i]) {
      count++;
      event.target.style.backgroundColor = divElementArray[i++];
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
        console.log(firstElement, secondElement);
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
    alert("Game Over ! you won the game");
  }
  
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
