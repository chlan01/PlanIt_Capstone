import api from '../utils/api';
import { setAlert } from './alert';
import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  ARCHIVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_LIST,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get boards
export const getBoards = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOARD });

    const res = await api.get('/boards');

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get board
export const getBoard = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/boards/${id}`);

    if (res) {
      api.defaults.headers.common['boardId'] = id;
    } else {
      delete api.defaults.headers.common['boardId'];
    }

    dispatch({
      type: GET_BOARD,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add board
export const addBoard = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.post('/boards', body, config);

    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });

    dispatch(setAlert('Board Created', 'success'));

    history.push(`/board/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename board
export const renameBoard = (boardId, formData) => async (dispatch) => {
  try {
    const res = await api.patch(`/boards/rename/${boardId}`, formData, config);

    dispatch({
      type: RENAME_BOARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get list
export const getList = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add list
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.post('/lists', body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename list
export const renameList = (listId, formData) => async (dispatch) => {
  try {
    const res = await api.patch(`/lists/rename/${listId}`, formData, config);

    dispatch({
      type: RENAME_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive list
export const archiveList = (listId, archive) => async (dispatch) => {
  try {
    const res = await api.patch(`/lists/archive/${archive}/${listId}`);

    dispatch({
      type: ARCHIVE_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get card
export const getCard = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.post('/cards', body, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit card
export const editCard = (cardId, formData) => async (dispatch) => {
  try {
    const res = await api.patch(`/cards/edit/${cardId}`, formData, config);

    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.patch(`/cards/move/${cardId}`, body, config);

    dispatch({
      type: MOVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive card
export const archiveCard = (cardId, archive) => async (dispatch) => {
  try {
    const res = await api.patch(`/cards/archive/${archive}/${cardId}`);

    dispatch({
      type: ARCHIVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete card
export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    const res = await api.delete(`/cards/${listId}/${cardId}`);

    dispatch({
      type: DELETE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get activity
export const getActivity = () => async (dispatch) => {
  try {
    const boardId = api.defaults.headers.common['boardId'];

    const res = await api.get(`/boards/activity/${boardId}`);

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add member
export const addMember = (userId) => async (dispatch) => {
  try {
    const res = await api.put(`/boards/addMember/${userId}`);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.patch(`/lists/move/${listId}`, body, config);

    dispatch({
      type: MOVE_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card member
export const addCardMember = (formData) => async (dispatch) => {
  try {
    const { add, cardId, userId } = formData;

    const res = await api.put(`/cards/addMember/${add}/${cardId}/${userId}`);

    dispatch({
      type: ADD_CARD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add checklist item
export const addChecklistItem = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.post(`/checklists/${cardId}`, body, config);

    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit checklist item
export const editChecklistItem = (cardId, itemId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await api.patch(`/checklists/${cardId}/${itemId}`, body, config);

    dispatch({
      type: EDIT_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete/Uncomplete checklist item
export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;

    const res = await api.patch(`/checklists/${cardId}/${complete}/${itemId}`);

    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete checklist item
export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
  try {
    const res = await api.delete(`/checklists/${cardId}/${itemId}`);

    dispatch({
      type: DELETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
