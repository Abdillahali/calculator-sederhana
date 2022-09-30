const calculator ={
    displayNumber: '0',
    operator:null,
    firstNumber:null,
    waitingForSecondNumber: false,
};

function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber ='0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputAngka(angka){
    if(calculator.displayNumber ==='0'){
        calculator.displayNumber = angka;
    }
    else{
        calculator.displayNumber += angka;
    }
}

const buttons = document.querySelectorAll('.button');

for (const button of buttons){


    button.addEventListener('click', function(event){
        const target = event.target;
        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')){
            handlerOperator(target.innerText);
            return;
        }

        inputAngka(target.innerText);
        updateDisplay();
    });
}

function inverseNumber(){
    if(calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handlerOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber= true;
        calculator.firstNumber = calculator.displayNumber;

        calculator.displayNumber = '0';
    } else {
        alert('Operator udah ada')
    }
}

function performCalculation(){
    if(calculator.firstNumber==null || calculator.operator == null){
        alert('Pilih operator');
        return;
    }
    let result= 0;
    if (calculator.operator === '+'){
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);

    } else if(calculator.operator === '-'){
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    } else if(calculator.operator === 'x'){
        result =parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) / parseInt (calculator.displayNumber);
    }

    const history ={
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber =result;
    renderHistory();
}

