import { CLOSE_SUCCESS_POPUP, OPEN_SUCCESS_POPUP, SET_SUBDIVISIONS } from '../constants/new';

let initialState = {
  successVisible: false, //сделать окошко,
  subdivisions: []
}

const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBDIVISIONS: {
      return { ...state, subdivisions: action.data }
    }
    case OPEN_SUCCESS_POPUP: {
      return { ...state, successVisible: true };
    }
    case CLOSE_SUCCESS_POPUP: {
      return { ...state, successVisible: false };
    }
    default: {
      return state;
    }
  }
}

export default newReducer;