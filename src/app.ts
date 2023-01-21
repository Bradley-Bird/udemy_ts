type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {} -- this would work also with interfaces instead of types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Bradley',
    privileges: ['create-server'],
    startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
//intersection operator '&'
type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    //this is a type guard using "typeof"
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);
    //for objects the "in" will check for a key with the name of whatever you put in the string i am assuming.
    if ('privileges' in emp) {
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ('startDate' in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Brungus', startDate: new Date() });

class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo... ${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};

useVehicle(v1);
useVehicle(v2);

//Discriminated Unions-
//Having one common property in every object that makes up the union which describes the object. I.E. type: 'whatever'
interface Bird {
    //literal type- type has to be a string with the value of bird
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving with speed: ${speed}`);
};

moveAnimal({ type: 'bird', flyingSpeed: 1000 });

//Type Casting
//type HTMLParagraphElement | null
// const paragraph = document.querySelector('p');
//==================================================
//type HTMLElement | null --type script no longer knows its a p tag
// const paragraph = document.getElementById('message-output');
//===================================================
// const userInputElement = <HTMLInputElement>(
//     document.getElementById('user-input')!
// ); ======================================== same as below
// const userInputElement = document.getElementById(
//     'user-input'
// )! as HTMLInputElement;
// userInputElement.value = 'Hi there!';
//===========================================alternative below
const userInputElement = document.getElementById('user-input');
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}
//index type
interface ErrorContainer {
    // { email: 'not a valid email', username: 'Must start with a character'}
    //==========================================================
    //Don't know prop/key: values just know that they are supposed to be strings
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a capital character!',
};

//function overloads ---line 25-26
const result = add('Bradley', 2);
result.split(' ');

//optional chaining
//if this was fetched and ts didnt know weather job exists or not it wouldn't error.
const fetchedUserData = {
    id: 'u1',
    name: 'Bradley',
    job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserData?.job.title);

//Nullish Coalescing = ?? IF NULL OR UNDEFINED USE DEFAULT OTHERWISE WE CAN USE SOMETHING LIKE AN EMPTY STRING EVEN THOUGH ITS CONSIDERED NULLISH OR FALSY (I THINK)
//This is all example assuming we are getting from backend
const userInput = '';
const storedData = userInput ?? 'DEFAULT';
