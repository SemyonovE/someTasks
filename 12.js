/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
    try {
        if(size === undefined) {
            throw new Error('No size given!');
        }
        if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE) {
            throw new  Error('Invalid size!');
        }
        if (stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_POTATO && stuffing !== Hamburger.STUFFING_SALAD) {
            throw new  Error('Invalid stuffing!');
        }
        this._size = size;
        this._stuffing = stuffing;
        this._toppings = [];
    } catch (error) {
        HamburgerException(error.message);
    }
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 50020;
Hamburger.SIZE_LARGE = 100040;
Hamburger.STUFFING_CHEESE = 10020;
Hamburger.STUFFING_SALAD = 20005;
Hamburger.STUFFING_POTATO = 15010;
Hamburger.TOPPING_MAYO = 20005;
Hamburger.TOPPING_SPICE = 15000;

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
    try {
        for (var t = 0; t < this._toppings.length; t++) {
            if (this._toppings[t] === topping) {
                throw new Error('The topping has already been added!');
            }
        }
    } catch (error) {
        HamburgerException(error.message);
    }
    this._toppings.push(topping);
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
    try {
        for (var t = 0; t < this._toppings.length; t++) {
            if (this._toppings[t] === topping) {
                this._toppings.splice(t, 1);
                return;
            }
        }
        throw new Error('The topping has not been added!');
    } catch (error) {
        HamburgerException(error.message);
    }
};

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this._toppings;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
   return this._size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this._stuffing;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    var sum = Math.floor(this._size / 1E3);

    sum += Math.floor(this._stuffing / 1E3);

    for(var t = 0; t < this._toppings.length; t++) {
        sum += Math.floor(this._toppings[t] / 1E3);
    }

    return sum;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    var sum = Math.floor(this._size % 1E3);

    sum += Math.floor(this._stuffing % 1E3);

    for(var t = 0; t < this._toppings.length; t++) {
        sum += Math.floor(this._toppings[t] % 1E3);
    }

    return sum;
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (message) {
    console.error(message);
}

// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1

// не передали обязательные параметры
var h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
h4.addTopping(Hamburger.TOPPING_MAYO);
h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'