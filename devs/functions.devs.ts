// function newAdd(n1: number, n2: number): number {
//     return n1 + n2;
// }
function newAdd(n1: number, n2: number) {
    return n1 + n2;
}

function newPrintResult(num: number): void {
    //in this case void is inferred just as number is in the above example
    //this is because this function doesn't return anything/ a value
    console.log('Result' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

newPrintResult(newAdd(5, 12));

let newCombineValues: (a: number, b: number) => number;

newCombineValues = newAdd;

// newCombineValues = newPrintResult;
// newCombineValues = 8;

console.log(newCombineValues(8, 8));

addAndHandle(10, 20, (result) => {
    console.log(result);
});
