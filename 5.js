/*
    Частичное применение (partial application)
    вики: http://ru.wikipedia.org/wiki/%D0%A7%D0%B0%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5

    Напиши функцию partial(fn, a1, a2, ....),
    которая позволяет зафиксировать один или несколько аргументов функции. Пример:
*/

function add(a, b) { return a + b; }
function mult(a, b, c, d) { return a * b * c * d; }

var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6
/*
    Есть функция с аргументами:

    f1(a, d, c, d)

    Мы можем с помощью partial сделать из нее функцию с меньшим числом аргументов, заранее задав значения для нескольких из них, например:

    var f2 = partial(f1, 1, 2); // фиксируем a = 1, b = 2

    И вызов:
    f2(x, y)
    будет равносилен вызову:
    f1(1, 2, x, y)

    Кстати, имеющийся в новых версиях JS метод bind() тоже может делать частичное применение:
    http://frontender.info/partial-application-in-javascript-using-bind/
    Но ты должен обойтись без его использования, и написать свой велосипед.
*/

function partial() {
    var fn = arguments[0];
    var argArray = argsToArray(arguments, 1);

    return function() {
        return fn.apply(this, argArray.concat(argsToArray(arguments, 0)));
    }
}

function argsToArray(obj, start) {
    var resultArray = [];

    for(var i = start; i < obj.length; i++) {
        resultArray.push(obj[i]);
    }

    return resultArray;
}