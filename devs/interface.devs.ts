type AddFn = (a: number, b: number) => number;
// interface AddFn {
//     (a: number, b: number): number;
// }
let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};
interface Named {
    readonly name?: string;
    outputName?: string; //this question mark makes it optional
}

//more used for defining an object. rather than type = .
interface Greetable extends Named {
    // readonly can be used on type also

    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 33;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string): void {
        this.name ? console.log(`${phrase} ${this.name}`) : console.log('Hi!');
    }
}
let user1: Greetable;

user1 = new Person();

user1.greet('Hi there - I am');
