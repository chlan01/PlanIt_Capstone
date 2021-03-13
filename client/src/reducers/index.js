import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import board from './board';
import profile from './profile';
import post from './post';

export default combineReducers 
({ 
    alert, 
    auth, 
    board,
    profile,
    post
});
