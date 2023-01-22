//Generic type <someType>
// const names: Array<string> = [];
// // names[0].split();

// const promise = new Promise<number>((resolve, reject) => {
//     setTimeout(() => {
//         resolve(10);
//     }, 2000);
// });

// promise.then((data) => {
//     data.split(' ');
// });

//==================building our own generic types =====================
//The use of <T> as a generic rather than <object> allows TS to infer the types of the arguments so that we can then use them later with out having to specifically cast the type. THIS ALLOWS US TO WORK WITH THE RESULT OF THE FUNCTION IN A TYPESCRIPT OPTIMAL WAY E.G. line 27
//=====================================================================
//the "extends object" CONSTRAINS this type to be anything as long as its an object.
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB);
};

console.log(merge({ name: 'bradley' }, { age: 30 }));

const mergedObj = merge({ name: 'bradley', hobbies: ['GAMES'] }, { age: 33 });

console.log(mergedObj.age);

interface Lengthy {
    length: number;
}
//here using the generic <T extends Lengthy> says that we do not care what it is as long as whatever it is has a length property.
const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
};

console.log(countAndDescribe(['Sports', 'cooking']));
console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe([]));
console.log(countAndDescribe(['henlo']));
//the keyof constraint allows the second generic to be reliant on the first here.
const extractAndConvert = <T extends object, U extends keyof T>(
    obj: T,
    key: U
) => {
    console.log(`Value: ${obj[key]}`);
};

extractAndConvert({ name: 'Bradley' }, 'name');

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Bradley');
textStorage.addItem('Shanin');
textStorage.removeItem('Shanin');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.addItem(3);
numberStorage.removeItem(2);
console.log(numberStorage.getItems());

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: 'max' });
// objectStorage.addItem({ name: 'bradley' });
// objectStorage.removeItem({ name: 'bradley' });
// console.log(objectStorage.getItems());

//=======================Generic utility types=========================
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}
//Partial
function createCourseGoal(
    title: string,
    description: string,
    date: Date
): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}
//Readonly
const names: Readonly<string[]> = ['Bradley', 'Shanin'];
// names.push('Aryn');
