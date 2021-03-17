import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth(Old)';
import board from './board';
import post from './post';
import profile from './profile';

export default combineReducers 
({ 
    alert, 
    auth, 
    board,
    post,
    profile
});
