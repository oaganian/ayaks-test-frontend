import { COLLAPSE } from '../constants/sider';

let initialState = {
  collapsed: false
}

const siderReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLAPSE: {
      return { ...state, collapsed: !state.collapsed }
    }
    default: {
      return state;
    }
  }
}

export default siderReducer;