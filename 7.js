/*
    Напиши функцию bind, которая позволяет привязать контекст (значение this) к функции:
 */

window.x = 1;
var ctx = { x: 2 };

function testThis(a) { console.log("x=" + this.x + ", a=" + a); }
console.log(testThis(100)); // x=1, a=100
var boundFunction = bind(testThis, ctx);
console.log(boundFunction(100)); // x=2, a= 100
/*
    В новых браузерах и функций есть метод bind(), делающий аналогичную вещь:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

    В библиотеках тоже есть такой метод: http://lodash.com/docs#bind
*/

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    }
}