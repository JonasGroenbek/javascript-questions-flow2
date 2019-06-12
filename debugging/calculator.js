//DEBUG=calculator node calculator.js
//DEBUG=multiple node calculator.js

const calcDebugging = require('debug')('calculator')
const multipleCalcDebugging = require('debug')('multiple')

calculator = {
    add: function (a, b) {
        calcDebugging(`input: ${a} + ${b}`)
        return a + b
    },
    sub: function (a, b) {
        calcDebugging(`input: ${a} - ${b}`)
        return a - b
    },
    mul: function (a, b) {
        calcDebugging(`input: ${a} * ${b}`)
        return a * b
    },
    div: function (a, b) {
        calcDebugging(`input: ${a} / ${b}`)
        return a / b
    }
}

function addAndSubtract(a,b){
    multipleCalcDebugging("adding..")
    console.log(calculator.add(a,b));
    multipleCalcDebugging("subtracting..");
    console.log(calculator.sub(a,b));
}

addAndSubtract(1,2);

console.log(calculator.add(1,2))