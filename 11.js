/*
    Дан список вида «страна, город, население»:
    http://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%BC%D1%8B%D0%B5_%D0%BD%D0%B0%D1%81%D0%B5%D0%BB%D1%91%D0%BD%D0%BD%D1%8B%D0%B5_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5_%D0%B0%D0%B3%D0%BB%D0%BE%D0%BC%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8#.D0.98.D1.81.D0.BF.D0.BE.D0.BB.D1.8C.D0.B7.D0.BE.D0.B2.D0.B0.D0.BD.D0.BD.D1.8B.D0.B5_.D0.BC.D0.B5.D1.82.D0.BE.D0.B4.D1.8B

    Можешь взять оттуда первые 5-10 городов и перенести в код.
    Города в списке могут идти в произвольном порядке.
    Напиши программу, которая отберет и выведет N самых населенных городов по убыванию числа жителей.
 */

var town = { country: 'КНР', city: 'Пекин', number: 20415 };
town.next = { country: 'Мексика', city: 'Мехико', number: 20400 };
town.next.next = { country: 'КНР', city: 'Гуанчжоу — Фошань', number: 19075 };
town.next.next.next = { country: 'Республика Корея', city: 'Сеул — Инчхон', number: 24105 };
town.next.next.next.next = { country: 'Пакистан', city: 'Карачи', number: 23545 };
town.next.next.next.next.next = { country: 'КНР', city: 'Шанхай', number: 23390 };
town.next.next.next.next.next.next = { country: 'Индия', city: 'Бангалор', number: 10535 };
town.next.next.next.next.next.next.next = { country: 'Великобритания', city: 'Лондон', number: 10470 };
town.next.next.next.next.next.next.next.next = { country: 'Вьетнам', city: 'Хошимин', number: 10380 };
town.next.next.next.next.next.next.next.next.next = { country: 'Индия', city: 'Ченнаи', number: 10265 };

function findTowns(count) {
    var townsTemp = Object.assign({}, town);
    var array = [];

    var current = townsTemp;
    var currentGlobalTown = town;
    while(current.next != null) {
        current.next = Object.assign({}, currentGlobalTown.next);
        current = current.next;
        currentGlobalTown = currentGlobalTown.next;
    }

    for(var i = 0; i < count; i++) {
        var lastTown = null;
        var maxTown = townsTemp;

        var current = townsTemp;
        var last = null;
        while(current.next != null) {
            last = current;
            current = last.next;

            if(maxTown.number < current.number) {
                maxTown = current;
                lastTown = last;
            }
        }

        if(!lastTown) {
            townsTemp = townsTemp.next;
        } else {
            lastTown.next = maxTown.next;
        }

        delete maxTown.next;
        array.push(maxTown);
        delete maxTown;
    }

    return array;
}

function findTowns2(count) {
    var array = [];
    var towns = [];

    var current = town;
    while(current.next != null) {
        towns.push(Object.assign({}, current));
        delete towns[towns.length - 1].next;
        current = current.next;
    }

    for(var i = 0; i < count; i++) {
        var start = 0;
        while(!towns[start]) { start++; }

        var numMax = start;

        for(var j = start + 1; j < towns.length; j++) {
            if(!towns[j]) continue;

            if(towns[numMax].number < towns[j].number) {
                numMax = j;
            }
        }

        array.push(towns[numMax]);
        towns[numMax] = null;
    }

    return array;
}

console.log(findTowns(5));
console.log(findTowns2(5));
console.log(town);