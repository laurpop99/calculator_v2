let displayScreen = document.querySelector(".display");
let displayString = "0";
let operationPerformed = "";
displayScreen.textContent = displayString;
let previousAmount = "", currentAmount = "";
let multipleOperations = false;
const keys = document.querySelectorAll(".keys");
const operatorKeys = document.querySelectorAll(".operators");
const operators = [];


function updateScreen(){
    displayScreen.textContent = displayString;
}

function clearScreen(){
    displayString = "0";
    updateScreen();
}

function clearKey(){
    displayString = displayString.substring(0,displayString.length-1);
    updateScreen();
}

function addOperation(num1, num2){
    return Math.round((Number(num1) + Number(num2))*100)/100;
}

function subtractOperation(num1,num2){
    return Math.round((Number(num1) - Number(num2))*100)/100;
}

function multiplyOperation(num1, num2){
    return Math.round((Number(num1) * Number(num2))*100)/100;
}

function divideOperation(num1, num2){
    return Math.round((Number(num1) / Number(num2))*100)/100;
}

function clickKey(){
    if(displayString === "0"){
        displayString = "";
    }
    
    displayString += this.textContent;
    updateScreen();
    
    

}

function pressKey(e){
    console.log(e.key)
    if(e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" 
        || e.key === "7" || e.key === "8" || e.key === "9" || e.key === "."){
    if(displayString === "0"){
        displayString = "";
    }
    
    displayString += e.key;
    updateScreen();
    }
    if(e.key === "+" || e.key === "*" || e.key === "-" || e.key === "/"){
        assignOperationPress(e);
    }

    if(e.key === "Enter"){
       equalOperation();
    }

    if(e.key === "c" || e.key === "C"){
        clearScreen();
     }

     if(e.key === "Backspace"){
        clearKey();
     }

}

function assignOperation(){
    
    if(previousAmount !== "")
    {
        if(operationPerformed !== this.textContent){
            currentAmount = displayString;
            performOperation(operationPerformed, previousAmount, currentAmount);
            operationPerformed = this.textContent;
            previousAmount = displayString;
            displayString = "";
        }
        else {
        operationPerformed = this.textContent;
        currentAmount = displayString;
        performOperation(operationPerformed, previousAmount, currentAmount);
        previousAmount = displayString;
        displayString = "";
        }
    }
    else {
    previousAmount = displayString;
    operationPerformed = this.textContent;
    clearScreen();

    }
}

function assignOperationPress(e){
    
    if(previousAmount !== "")
    {
        if(operationPerformed !== e.key && e.key !== "/"){
            currentAmount = displayString;
            performOperation(operationPerformed, previousAmount, currentAmount);
            operationPerformed = e.key;
            console.log(operationPerformed);
            previousAmount = displayString;
            displayString = "";
        }
        else {
        operationPerformed = e.key;
        console.log(operationPerformed);
        currentAmount = displayString;
        performOperation(operationPerformed, previousAmount, currentAmount);
        previousAmount = displayString;
        displayString = "";
        }
    }
    else {
    previousAmount = displayString;
    operationPerformed = e.key;
    if(e.key === "/"){
        operationPerformed = "÷";
    }
    console.log(operationPerformed);
    clearScreen();

    }

}

function performOperation(operation, previousAmount, currentAmount){
    currentAmount = displayString;
    if(operation === "+"){
        displayString =  addOperation(previousAmount, currentAmount);
        previousAmount = displayString;
        updateScreen();

    }
    else if(operation === "-"){
        displayString = subtractOperation(previousAmount, currentAmount);
        updateScreen();
    }

    else if(operation === "÷"){
        displayString = divideOperation(previousAmount,currentAmount);
        updateScreen();
         }
    
    else if(operation === "*"){
        displayString = multiplyOperation(previousAmount,currentAmount);
        updateScreen();
    }
    
}

function equalOperation(){
    currentAmount = displayString;
    performOperation(operationPerformed, previousAmount, currentAmount);
    currentAmount = displayString;
    previousAmount = "";


}

keys.forEach((key) => {
    key.addEventListener("click", clickKey)
})

operatorKeys.forEach( (operator) => {
    operators.push(operator.textContent);
})

document.addEventListener("keydown",pressKey);


operatorKeys[operators.indexOf("C")].addEventListener("click", clearScreen);
operatorKeys[operators.indexOf("⌫")].addEventListener("click", clearKey);
operatorKeys[operators.indexOf("+")].addEventListener("click", assignOperation);
operatorKeys[operators.indexOf("-")].addEventListener("click", assignOperation);
operatorKeys[operators.indexOf("÷")].addEventListener("click", assignOperation);
operatorKeys[operators.indexOf("*")].addEventListener("click", assignOperation);
operatorKeys[operators.indexOf("=")].addEventListener("click", equalOperation);
