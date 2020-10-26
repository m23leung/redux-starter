import configureStore from './store/configureStore';
//import store from './customStore';
import { bugAdded, bugResolved, bugRemoved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();

store.subscribe(() => {
    console.log("STORE CHANGED!!!");
})
store.dispatch(projectAdded({name: "Project 1"}));

store.dispatch(bugAdded({description: "Bug 1"}));
store.dispatch(bugAdded({description: "Bug 2"}));
store.dispatch(bugAdded({description: "Bug 3"}));

store.dispatch(bugResolved({id: 1}));
store.dispatch(bugRemoved({id: 1}));

console.log(store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());

console.log(unresolvedBugs);