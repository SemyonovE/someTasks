/*
    Напиши функцию создания генератора sequence(start, step).
    Она при вызове возвращает другую функцию-генератор,
    которая при каждом вызове дает число на 1 больше, и так до бесконечности.
    Начальное число, с которого начинать отсчет, и шаг, задается при создании генератора.
    Шаг можно не указывать, тогда он будет равен одному.
    Начальное значение по умолчанию равно 0. Генераторов можно создать сколько угодно.
*/

var generator = sequence(10, 3);
var generator2 = sequence(7, 1);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8

function sequence(start, step) {
    if(!start) start = 0;
    if(!step) step = 1;

    var x = start - step;

    return function() {
        x = x + step;
        return x;
    }
}