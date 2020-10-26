// Implementing the DUCKS pattern

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
                userId: ''
             })            
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id == action.payload.id);
            bugs[index].resolved = true;            
        },
        bugResolvedCancel: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id == action.payload.id);
            bugs[index].resolved = false;                 
        },
        bugRemoved: (bugs, action) => {           
            const index = bugs.findIndex(bug => bug.id == action.payload.id);
            bugs.splice(index, 1);
        },
        bugAssignedUser: (bugs, action) => {           
            const index = bugs.findIndex(bug => bug.id == action.payload.bugId);
            console.log("BUG ID: ", action.payload.bugId);
            console.log("USER ID: ", action.payload.userId);
            console.log(index);

            bugs[index].userId = action.payload.userId;                 
        }
    }
})
export const {bugAdded, bugResolved, bugRemoved, bugResolvedCancel, bugAssignedUser} = slice.actions;
export default slice.reducer;

// Selector : takes state and returns computed state
export const getUnresolvedBugs = state => 
    state.entities.bugs.filter(bug => !bug.resolved);

// Memoization 
// bugs => get unresolved bugs from the cache
export const getUnresolvedBugsMemo = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter (bug => !bug.resolved)
)

// Selector : takes state and returns computed state
//export const getBugsByUser = state => 
//    state.entities.bugs.filter(bug => bug.userId === userId);

// Memoization 
// bugs => get bugs by specific user from the cache
export const getBugsByUserMemo = (userId) => (createSelector(
    state => state.entities.bugs,
    (bugs) => bugs.filter (bug => bug.userId === userId)
    )
)

