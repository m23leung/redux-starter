import configureStore from './store/configureStore';
//import store from './customStore';
import { bugAdded, bugResolved, bugRemoved, bugAssignedUser, getUnresolvedBugs, getUnresolvedBugsMemo, getBugsByUserMemo } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

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

const unresolvedBugs = getUnresolvedBugsMemo(store.getState());
const unresolvedBugs2 = getUnresolvedBugsMemo(store.getState());
console.log(unresolvedBugs === unresolvedBugs2);

store.dispatch(userAdded({name: "FRED"}));
store.dispatch(bugAssignedUser({userId: 1, bugId: 2}));

console.log(store.getState());

const bugsByUser = getBugsByUserMemo(2)(store.getState());
console.log(bugsByUser);
