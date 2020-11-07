// Implementing the DUCKS pattern

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';
import axios from 'axios';

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload; 
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload)            
        },
        bugResolved: (bugs, action) => {
            const { id } = action.payload;    
            const index = bugs.list.findIndex(bug => bug.id == id);
            bugs.list[index].resolved = true;    

        },
        bugResolvedCancel: (bugs, action) => {
            const { id } = action.payload;    
            const index = bugs.list.findIndex(bug => bug.id == id);
            bugs.list[index].resolved = false;                 
        },
        bugRemoved: (bugs, action) => {     
            const { id } = action.payload;      
            const index = bugs.findIndex(bug => bug.id == id);
            bugs.splice(index, 1);
        },
        bugAssignedUser: (bugs, action) => {           
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id == bugId);
            bugs.list[index].userId = userId;      
        }
    }
})

export const {
        bugAdded, 
        bugResolved, 
        bugRemoved, 
        bugResolvedCancel, 
        bugAssignedUser, 
        bugsReceived,
        bugsRequested,
        bugsRequestFailed
    } = slice.actions;

export default slice.reducer;

// Actions creators
const url = '/bugs';

// () => fn(dispatch, getState)
export const loadBugs = () =>  (dispatch , getState) => {
    const { lastFetch } = getState().entities.bugs; 

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    if ( diffInMinutes < 10) return;

    console.log(lastFetch);

    dispatch(apiCallBegan({
        url: url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }))
}

export const addBug = bug => async dispatch => {
    const response = await axios.request({
        baseURL: 'http://localhost:9001/api',
        url: '/bugs',
        method: 'post',
        data: bug
    })
    dispatch(bugAdded(response.data));
}
/*
export const addBug = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type
})
*/
export const resolveBug = id => apiCallBegan({
    url: url + '/' + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedUser.type
})

// Selector : takes state and returns computed state
export const getUnresolvedBugs = state => 
    state.entities.bugs.list.filter(bug => !bug.resolved);

// Memoization 
// bugs => get unresolved bugs from the cache
export const getUnresolvedBugsMemo = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter (bug => !bug.resolved)
)



// Selector : takes state and returns computed state
//export const getBugsByUser = state => 
//    state.entities.bugs.filter(bug => bug.userId === userId);

// Memoization 
// bugs => get bugs by specific user from the cache
export const getBugsByUserMemo = (userId) => (createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter (bug => bug.userId === userId)
    )
)

