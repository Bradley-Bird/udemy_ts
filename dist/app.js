"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const Logger = (logString) => (constructor) => {
    console.log(logString);
    console.log(constructor);
};
const withTemplate = (template, hookId) => (originalConstructor) => {
    return class extends originalConstructor {
        constructor(..._) {
            super();
            console.log('rendering template');
            const hookEL = document.getElementById(hookId);
            if (hookEL) {
                hookEL.innerHTML = template;
                hookEL.querySelector('h1').textContent = this.name;
            }
        }
    };
};
let Person = class Person {
    constructor() {
        this.name = 'Bradley';
        console.log('creating person object...');
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON'),
    withTemplate('<h1>My Person Object</h1>', 'app')
], Person);
const pers = new Person();
console.log(pers);
const Log = (target, propertyName) => {
    console.log('Property Decorator!');
    console.log(target, propertyName);
};
const Log2 = (target, name, descriptor) => {
    console.log('Accessor decorator!');
    console.log(name);
    console.log(target);
    console.log(descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log('Method decorator!');
    console.log(name);
    console.log(target);
    console.log(descriptor);
    return {};
};
const Log4 = (target, name, position) => {
    console.log('Parameter decorator!');
    console.log(name);
    console.log(target);
    console.log(position);
};
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product('book', 20);
console.log(p1);
const tax = p1.getPriceWithTax(8.4);
console.log(tax);
const AutoBind = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFN = originalMethod.bind(this);
            return boundFN;
        },
    };
    return adjDescriptor;
};
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
const Required = (target, propName) => {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
};
const PositiveNumber = (target, propName) => {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
};
const validate = (obj) => {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
};
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('please try again');
        return;
    }
    console.log(createdCourse);
});
