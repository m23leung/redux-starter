
import { compose, pipe } from 'lodash/fp';

let input = "    Javascript   ";
let output = "<div" + input.trim() + "</div";

const trim = str => str.trim();

//Currying
const wrap = type => str => `<${type}>${str}</${type}`;

const toLowerCase = str => str.toLowerCase();

//const result = wrapInDiv(toLowerCase(trim(input)));
//console.log(result);

// Higher Order Function - returns composition of all the functions below
// Have to read from right to left
const transform = compose(wrap, toLowerCase, trim);
console.log(transform(input));

// Another way to achive the same result, but reading from left to right with pipe
const transform2 = pipe(trim, toLowerCase, wrap('span'));
console.log(transform2(input));

const person = { name: 'John' };
const updated = {...person, age: 30 };
console.log(updated);