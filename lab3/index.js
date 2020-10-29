const undoStackContainer = document.getElementById('undo-stack');
const redoStackContainer = document.getElementById('redo-stack');

const undoButton = document.getElementById('undo-button');
const redoButton = document.getElementById('redo-button');

const gridButtons = Array.from(document.querySelectorAll('[data-position]'));

// this line will error until you FIND the undoStackContainer
// and redoStackContainer elements
const undoStack = new Stack(undoStackContainer);
const redoStack = new Stack(redoStackContainer);

// this array is a bunch of hex values for colors so that 
// our random grid will be colored nicely. 
const COLORS = [
    '#1abc9c', '#16a085', '#f1c40f', '#f39c12',
    '#2ecc71', '#27ae60', '#e67e22', '#d35400',
    '#3498db', '#2980b9', '#e74c3c', '#c0392b',
    '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e', 
    '#2c3e50', '#7f8c8d', '#95a5a6',
]


/**
 * @function handleGridButtonClick
 * 
 * @param {MouseEvent} event - the dispatched click event
 * @returns {void}
 * 
 * @description This function is an event handler for the grid buttons. When 
 * a grid button is clicked, it should change to a random color from the COLORS
 * Array. Because each grid button has a data-position property (which can
 * be accessed using event.currentTarget.dataset.position) you'll be able 
 * to figure out which button was clicked as well as what style it currently has.
 * 
 * When we press a button, we should change that color of the button, 
 * we create a new div to add to the undo Stack
 * as part of the new div, we need to store color and number of that button
 * we add that new div to the undo Stack
 * 
 */
function handleGridButtonClick(event) {
  //get the button after clicking the button
  let currentButton = event.currentTarget
  //get random color from grid
  const randomIndexColor = Math.floor(Math.random()*COLORS.length)
  //change original button to the new random color 
  currentButton.style.backgroundColor = COLORS[randomIndexColor]
    
  //create new div 
  let newDiv = document.createElement("div"); 
  //give button background color to background color of new div
  newDiv.style.backgroundColor = window.getComputedStyle(currentButton).backgroundColor;
  //store number of the button pressed
  const newContent = document.createTextNode(currentButton.dataset.position);
  //add number to new div
  newDiv.appendChild(newContent);
  //push new div onto the undo Stack of html
  undoStackContainer.prepend(newDiv);
  //push new div onto the undo Stack
  undoStack.push(newDiv);
}

/** 
 * we split up handleStackButtonClicked(fromStack, toStack) to two separate functions 
 * to make it easier to understand what we were doing with each of the Undo and Redo buttons
*/

/**
 * @function handleUndoButtonClicked
 * 
 * @param {event} event - what triggers this function
 * @returns {void}
 * 
 * @description This function undoes a button click. When the undo button is pressed, a div at
 * the top of the undoStack should change to the button color on the grid, and then move to the
 * redoStack.
 */

function handleUndoButtonClicked(event) {
  //check if stack is empty, don't do anything
  if (undoStack.size()===0) 
    return;
  //get popped div after clicking undo
  let poppedDiv = undoStack.pop();
  //store the number of the popped div
  let index = parseInt(poppedDiv.textContent, 10);
  //store the color of the popped div
  let currentColor = poppedDiv.style.backgroundColor;

  //change background color of popped div to the color of the button on the grid
  poppedDiv.style.backgroundColor = gridButtons[index].style.backgroundColor;
  //push the popped div onto the redoStack
  redoStack.push(poppedDiv);
  //change the color of the button on the grid to the popped div color
  gridButtons[index].style.backgroundColor = currentColor;

  //add popped div to the top of the redoStack in the html
  redoStackContainer.prepend(poppedDiv);

}

/**
 * @function handleRedoButtonClicked
 * 
 * @param {event} event - what triggers this function
 * @returns {void}
 * 
 * @description This function redoes a button click. When the redo button is pressed, a div at
 * the top of the redoStack should change to the button color on the grid, and then move to the
 * undoStack.
 */

function handleRedoButtonClicked(event) {
  //check if stack is empty, don't do anything
  if (redoStack.size()===0)
    return;
  //get popped div after clicking redo
  let poppedDiv = redoStack.pop();
  //store the number of the popped div
  let index = parseInt(poppedDiv.textContent, 10);
  //store the color of the popped dive
  let currentColor = poppedDiv.style.backgroundColor;

  //change background color of popped div to the color of the button on the grid
  poppedDiv.style.backgroundColor = gridButtons[index].style.backgroundColor;
  //push the popped div onto the undoStack
  undoStack.push(poppedDiv);
  //change the color of the button on the grid to the popped div color
  gridButtons[index].style.backgroundColor = currentColor;

  //add popped div to the top of the undoStack in the html
  undoStackContainer.prepend(poppedDiv);
}

/**
 * @method main
 * 
 * @returns {void}
 * 
 * @description We could just run this Javascript as the document is being read. But I like
 * keeping functions separately and then calling them later. Peep the very last line of this
 * file. 
 */
function main() {
    // attach an event handler to each of the gridButtons
    for(let i = 0; i <gridButtons.length; i++)
    {
      const gridButton = gridButtons[i];
      gridButton.addEventListener('click', handleGridButtonClick);
    }

  //add an event handler to the undoButton and redoButton
  undoButton.addEventListener('click', handleUndoButtonClicked)
  redoButton.addEventListener('click', handleRedoButtonClicked)
}

// run our main function (even though Javascript doesn't actually need one)
main()