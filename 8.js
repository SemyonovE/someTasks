/*
    Напиши функцию pluck, которая берет массив объектов и возвращает массив значений определенного поля:
 */

    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred', 'age': 40 }
    ];

console.log(pluck(characters, 'name')); // ['barney', 'fred']

/*
    Такая функция была в lodash: http://lodash.com/docs#pluck но теперь
    вместо нее советуют использовать map: https://lodash.com/docs/4.15.0#map
    Функция не должна изменять исходный массив.
*/

function pluck(objects, fieldName) {
    var resultArray = [];

    for(var i = 0; i < objects.length; i++) {
        resultArray.push(objects[i][fieldName]);
    }

    return resultArray;
}