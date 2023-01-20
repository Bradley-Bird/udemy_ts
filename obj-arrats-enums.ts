// const person: {
//     name: string;
//     age: number;
// } = {
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     // Tuple [1,2] Added by TypeScript: Fixed-length array... beware that .push can break this and will allow it to break this rule
//     role: [number, string];
// } = {
//     name: 'Bradley',
//     age: 33,
//     hobbies: ['games', 'sleeping'],
//     role: [2, 'author'],
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// enum Role {
//     ADMIN = 100,
//     READ_ONLY, this would then be 101
//     AUTHOR = 'AUTHOR' - this would then be AUTHOR Rather than a number.
// }
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
}
const person = {
    name: 'Bradley',
    age: 33,
    hobbies: ['games', 'sleeping'],
    role: Role.ADMIN,
};

let favoriteActivities: string[];
favoriteActivities = ['sports'];

console.log('person', person.name);
//we are able to use string methods here because it knows that hobby is a string thanks to ts typeing.
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

person.role === Role.ADMIN
    ? console.log('you have admin privileges')
    : console.log('no admin currently logged in');
