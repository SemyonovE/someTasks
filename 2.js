/*
    Также, нужна функция take(gen, x)
    которая вызвает функцию gen заданное число (x) раз
    и возвращает массив с результатами вызовов.
    Она нам пригодится для отладки:
 */

var gen2 = sequence(0, 2);
console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]

function take(gen, x) {
    var array = [];
    for(var i = 0; i < x; i++) {
        array.push(gen());
    }
    return array;
}