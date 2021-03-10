import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
// will generate an id automatically
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  
  // after 5 seconds it will dispatch REMOVE_ALERT with the id as a payload in order to remove the 'Passwords do not match' alert from the UI 
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
