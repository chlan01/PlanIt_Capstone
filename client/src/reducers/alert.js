import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // state is immutable, we have to include any other state thats already there
      return [...state, payload];
    case REMOVE_ALERT:
      // remove a specific alert by its id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}