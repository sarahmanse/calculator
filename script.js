const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let op = null;
let result = 'error';

function processInput() {
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      if (buttons[i].classList.contains('number')) {
        inputNumber(buttons[i].innerText);
        updateDisplay();
      } else if (buttons[i].classList.contains('operator')) {
        inputOperator(buttons[i].innerText);
        updateDisplay();
      } else if (buttons[i].classList.contains('equals')) {
        inputEquals();
        updateDisplay();
      } else if (buttons[i].classList.contains('clear')) {
        clearDisplay();
        updateDisplay();
      }
    }
  )}
}

processInput();

function updateDisplay() {
  if(displayValue.length > 8) {
    display.innerText = displayValue.substring(0, 8);
  } else {
    display.innerText = displayValue;
  }
}

function inputNumber(number) {
  if (op === null) {
    if (displayValue === '0' && displayValue.length == 1) {
      displayValue = number;
    } else {
      displayValue += number;
    }
  } else {
    if (displayValue === firstNumber) {
      displayValue = number;
    } else {
      displayValue += number;
    }
  }  
}

function inputOperator(operator) {
  if (op === null) {
    firstNumber = displayValue;
    op = operator;
  } else {
    secondNumber = displayValue;
    result = operate(op, Number(firstNumber), Number(secondNumber));
    firstNumber = roundAccurately(result, 15).toString();
    op = operator;
    if (result === 'error'){
      displayValue = 'error';
    } else {
      displayValue = roundAccurately(result, 15).toString();
    }
  }  
}

function inputEquals() {
  if (firstNumber === null) {
    displayValue = result;
  } else {
    secondNumber = displayValue;
    result = operate(op, Number(firstNumber), Number(secondNumber));
    if (result === 'error'){
      displayValue = 'error';
    } else {
      displayValue = roundAccurately(result, 15).toString();
    }
    firstNumber = displayValue;
    op = null;
  }
}

function clearDisplay() {
  displayValue = '0';
  firstNumber = null;
  secondNumber = null;
  op = null;
  result = 'error';
}

function operate(operator, a, b) {
  if (operator === '+'){
    return add(a,b);
  } else if (operator === '-') {
    return subtract(a,b);
  } else if (operator === '*') {
    return multiply(a,b);
  } else if (operator === '/') {
    if (b === 0) {
      return 'error';
    } else {
      return divide(a,b);
    }
  }
}

let add = (a,b) => a + b;
let subtract = (a,b) => a - b;
let multiply = (a,b) => a * b;
let divide = (a,b) => a / b;

function roundAccurately(number, places) {
  return parseFloat(Math.round(number + 'e' + places) + 'e-' + places);
}
