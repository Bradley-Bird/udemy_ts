const Logger = (logString: string) => (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
};

const withTemplate =
    (template: string, hookId: string) =>
    <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) => {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('rendering template');
                const hookEL = document.getElementById(hookId);
                if (hookEL) {
                    hookEL.innerHTML = template;
                    hookEL.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };

//Decorators are executing bottom up
@Logger('LOGGING - PERSON')
@withTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Bradley';

    constructor() {
        console.log('creating person object...');
    }
}

const pers = new Person();

console.log(pers);

//================================
const Log = (target: any, propertyName: string | Symbol) => {
    console.log('Property Decorator!');
    console.log(target, propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('Accessor decorator!');
    console.log(name);
    console.log(target);
    console.log(descriptor);
};

const Log3 = (
    target: any,
    name: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor => {
    console.log('Method decorator!');
    console.log(name);
    console.log(target);
    console.log(descriptor);
    return {};
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
    console.log('Parameter decorator!');
    console.log(name);
    console.log(target);
    console.log(position);
};

class Product {
    @Log
    title: string;
    private _price: number;
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }
    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('book', 20);
console.log(p1);
const tax = p1.getPriceWithTax(8.4);
console.log(tax);

const AutoBind = (
    _: any,
    _2: string | Symbol | number,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
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
    message = 'This works!';
    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

//-----

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required'],
    };
};

const PositiveNumber = (target: any, propName: string) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive'],
    };
};

const validate = (obj: any) => {
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
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('please try again');
        return;
    }
    console.log(createdCourse);
});
