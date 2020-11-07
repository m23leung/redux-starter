
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



// Playing around with prototypes
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.print = function() {
    console.log(`NAME: ${this.name} . AGE: ${this.age}`);
}

function Admin(...args) {
    // Call the constructor of the child class
    User.apply(this, args);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.zoom = function () {
    console.log("ZOOMING");
}

var user = new User("Fred", 14);
var admin = new Admin("Joe", 20);

console.log(user);
console.log(admin);

user.print();
admin.print();
admin.zoom();

// Promises
let cleanRoom = function() {
    return new Promise(function(resolve, reject) {
      resolve('Cleaned The Room');
    });
  };
  
  let removeGarbage = function(message) {
    return new Promise(function(resolve, reject) {
      resolve(message + ' remove Garbage');
    });
  };
  
  let winIcecream = function(message) {
    return new Promise(function(resolve, reject) {
      resolve( message + ' won Icecream');
    });
  };
  
  cleanRoom().then(function(result){
      return removeGarbage(result);
  }).then(function(result){
      return winIcecream(result);
  }).then(function(result){
      console.log('finished ' + result);
  })