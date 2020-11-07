const func = ({dispatch, getState}) => next => action => {

    if (typeof action === "function") 
        action();
    
    else  
        next(action); // next middleware function or reducer
}

export default func;