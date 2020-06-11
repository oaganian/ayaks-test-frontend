import { reset } from 'redux-form';
import {
  CLOSE_SUCCESS_POPUP, OPEN_SUCCESS_POPUP,
  SET_SUBDIVISIONS
} from '../constants/new';

export const openSuccessPopup = (message) => {
  return {
    type: OPEN_SUCCESS_POPUP
  }
}
export const closeSuccessPopup = () => {
  return {
    type: CLOSE_SUCCESS_POPUP
  }
}

export const addNewRealtor = (newRealtor) => {
  return async dispatch => {
    await dispatch(reset('new'));
    fetch(`http://localhost:5000/api/realtors`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRealtor)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(openSuccessPopup());
      });
  }
}

export const fetchSubdivisions = () => {
  return dispatch => {
    fetch(`http://localhost:5000/api/subdivisions`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_SUBDIVISIONS,
          data: data
        });
      })
  }
}