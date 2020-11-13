
import { SET_FRONT_ELEMENT	 
	   } from '../actions/types.js';

const INITIAL_STATE = {
    elementShown: null
}

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_FRONT_ELEMENT:
		return { ...state,  elementShown: action.payload};

	default:
		return state
  }
};


