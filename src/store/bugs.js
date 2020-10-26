// Implementing the DUCKS pattern

import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
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
    }
})
export const {bugAdded, bugResolved, bugRemoved, bugResolcedCancel} = slice.actions;
export default slice.reducer;

// Selector : takes state and returns computed state
export const getUnresolvedBugs = state => 
    state.entities.bugs.filter(bug => !bug.resolved);