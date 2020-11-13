
import { SET_SERVICES	 
} from '../actions/types.js';

const INITIAL_STATE = {
  services: null
}

export default  (state = INITIAL_STATE, action) => {
switch (action.type) {

case SET_SERVICES:
 return { ...state,  services: action.payload};

default:
 return state
}
};


