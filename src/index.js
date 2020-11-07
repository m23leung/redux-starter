import configureStore from './store/configureStore';
//import store from './customStore';
import { getUnresolvedBugs, getUnresolvedBugsMemo, getBugsByUserMemo, loadBugs, addBug, resolveBug, assignBugToUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';


const store = configureStore();

/*
store.subscribe(() => {
    console.log("STORE CHANGED!!!");
})
*/

store.dispatch(addBug({ description: "a" }))


store.dispatch({
    type: "error",
    payload: { message: "An error occured." }
})

// UI Layer
store.dispatch(loadBugs());

//setTimeout(() => store.dispatch(loadBugs()), 2000);
setTimeout(() => store.dispatch(resolveBug(1)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

//store.dispatch(userAdded({name: "FRED"}));
//store.dispatch(bugAssignedUser({userId: 1, bugId: 2}));


/*
store.dispatch({
        type: 'apiCallBegan', // apiRequest
        payload : {
            url: '/bugs',
            onSuccess: 'bugsReceived',
            onError: 'apiRequestFailed'
        }
})
*/

//store.dispatch(projectAdded({name: "Project 1"}));
/*
store.dispatch((dispatch, getState) => {
    // Call an API
    // When the promise is resolved => dispatch()
    console.log(getState());
    dispatch({ type: 'bugsReceived', bugs: [1,2,3] })

    // If the promise is rejected => dispatch()

});
*/

/*
store.dispatch(projectAdded({name: "Project 1"}));

store.dispatch(bugAdded({description: "Bug 1"}));
store.dispatch(bugAdded({description: "Bug 2"}));
store.dispatch(bugAdded({description: "Bug 3"}));

store.dispatch(bugResolved({id: 1}));
store.dispatch(bugRemoved({id: 1}));

const unresolvedBugs = getUnresolvedBugsMemo(store.getState());
const unresolvedBugs2 = getUnresolvedBugsMemo(store.getState());
console.log(unresolvedBugs === unresolvedBugs2);

store.dispatch(userAdded({name: "FRED"}));
store.dispatch(bugAssignedUser({userId: 1, bugId: 2}));

console.log(store.getState());

const bugsByUser = getBugsByUserMemo(2)(store.getState());
console.log(bugsByUser);
*/

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