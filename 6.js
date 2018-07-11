/*
    Наша функция partial позволяет фиксировать только первые аргументы.
    Усовершенствуй ее, чтобы зафиксировать можно было любые аргументы,
    пропущенные аргументы обозначаются с помощью undefined. Обрати внимание,
    что теперь мы переименовали ее в partialAny, чтобы не путать с предыдущей:
 */

function test(a, b, c) { return 'a=' + a + ',b=' + b + ',c=' + c; }
var test1_3 = partialAny(test, 1, undefined, 3);
console.log(test1_3(5)); // a=1,b=5,c=3

function partialAny() {
    var fn = arguments[0];
    var argArray = argsToArray(arguments, 1);

    while(argArray[argArray.length - 1] === undefined && argArray.length > 0) { argArray.pop(); }

    return function() {
        return fn.apply(this, argsToArray2(argArray, arguments));
    }
}

function argsToArray2(firstArray, obj) {
    var j = 0;
    var resultArray = [];

    for(var i = 0; i < firstArray.length + obj.length; i++) {
        if(firstArray[i] === undefined) {
            resultArray.push(obj[j++]);
            continue;
        }

        resultArray.push((firstArray[i]))
    }

    return resultArray;
}