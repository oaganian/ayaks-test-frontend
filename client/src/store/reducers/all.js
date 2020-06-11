import {
  TOGGLE_LOADING,
  SET_PAGINATION_TOTAL,
  SET_DATA,
  SET_PAGINATION_CURRENT,
  SET_SUBDIVISIONS,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_DELETE_REALTOR_ID,
  SET_UPDATED_REALTOR,
  SET_DELETE_REALTOR
}
  from '../constants/all';

let initialState = {
  data: [],
  subdivisions: [],
  pagination: {
    current: 1,
    total: 0
  },
  loading: false,
  limit: 10,
  drawer: {
    visible: false,
    realtorId: 0
  },
  realtorDeleteId: 0
};

const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELETE_REALTOR: {
      let stateCopy = { ...state };
      stateCopy.data = [...state.data];
      let current_realtor_index = stateCopy.data.indexOf(stateCopy.data.find(r => r.id == action.realtorId));
      stateCopy.data.splice(current_realtor_index, 1);
      return stateCopy;
    }
    case SET_DELETE_REALTOR_ID: {
      return { ...state, realtorDeleteId: action.realtorId }
    }
    case SET_UPDATED_REALTOR: {

      let stateCopy = { ...state };
      stateCopy.data = [...state.data];
      let current_realtor_index = stateCopy.data.indexOf(stateCopy.data.find(r => r.id == action.realtorId));
      stateCopy.data[current_realtor_index] = { ...state.data[current_realtor_index] };
      for (var key in action.data) {
        for (var inner_key in stateCopy.data[current_realtor_index]) {
          if (key == inner_key) {
            stateCopy.data[current_realtor_index][inner_key] = action.data[key];
          }
        }
      }

      return stateCopy;
    }
    case CLOSE_DRAWER: {
      let stateCopy = { ...state };
      stateCopy.drawer = { ...state.drawer };
      stateCopy.drawer.visible = false;
      return stateCopy;
    }
    case OPEN_DRAWER: {

      let stateCopy = { ...state };
      stateCopy.drawer = { ...state.drawer };
      stateCopy.drawer.visible = true;
      stateCopy.drawer.realtorId = action.realtor_id
      return stateCopy;
    }
    case SET_SUBDIVISIONS: {
      return { ...state, subdivisions: action.subdivisions }
    }
    /*   case TOGGLE_DRAWER: {
         let stateCopy = { ...state };
         stateCopy.drawer = { ...state.drawer };
         stateCopy.drawer.visible = !state.drawer.visible;
         stateCopy.drawer.realtorId = action.realtorId;
         return stateCopy;
       }*/
    case SET_PAGINATION_CURRENT: {
      let stateCopy = { ...state };
      stateCopy.pagination = { ...state.pagination };
      stateCopy.pagination.current = action.current;
      return stateCopy;
    }
    case SET_DATA: {
      return { ...state, data: action.data }
    }
    case SET_PAGINATION_TOTAL: {

      let stateCopy = { ...state };
      stateCopy.pagination = { ...state.pagination };
      stateCopy.pagination.total = action.total;

      return stateCopy;
    }
    case TOGGLE_LOADING: {
      return { ...state, loading: !state.loading }
    }
    default: {
      return state;
    }
  }
}

export default allReducer;