import {createStore} from 'redux';

var initialState = {
    status : false,
    soft : {
        by: 'name',
        value : 1
    }
}

var myReducer = (state = initialState, action) => {
    if(action.type === 'TOGGLE_STATUS'){
        state.status = !state.status
    }
    return state;
}


const store = createStore(myReducer);
var action = {type : 'TOGGLE_STATUS'};
store.dispatch(action)
console.log(store.getState())