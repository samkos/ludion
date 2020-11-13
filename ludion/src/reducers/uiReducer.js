
import { SET_DISPLAY,  
		 SET_COUNTDOWN,
		 SET_WINDOW_DIMENSIONS,
		 UPDATE_MODAL,
		 TABLE_DISPLAY, 
		 HELP_MODAL, NAV_DISPLAY,
		 GO_NAV,
		 SET_MESSAGE,
	 	 SET_ROW_AND_LOG,
	   } from '../actions/types.js';

const INITIAL_STATE = {
	currentView : -1,
	displayType: TABLE_DISPLAY,  // either plot, table, pie, or raw data shown
	dimensions: {width:100, height:100},
	message: false,
	modalIsOpen: false,
	progress: true,
	requestOngoing: false,
	resetCountDown: 0,
	row: null,
	whichModal: HELP_MODAL,
}

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {

	case SET_DISPLAY:
		return { ...state, displayType:action.payload.displayType, 
						   previousDisplayType:state.displayType,
						   nextDisplayType : action.payload.nextDisplayType,
						};

	case SET_WINDOW_DIMENSIONS:
		return { ...state, dimensions: action.payload};

	case SET_ROW_AND_LOG:
		return { ...state,  row: action.payload.row}

	case SET_MESSAGE:
		// console.info('MSG:', action.payload.message);
		return state

		//return { ...state, 	message: action.payload}

	case UPDATE_MODAL:
		return { ...state, modalIsOpen: action.payload.modalIsOpen,
						   whichModal: action.payload.whichModal,
						   progress: !state.progress
		};

	case GO_NAV:
		return { ...state, displayType: NAV_DISPLAY,
						   row: action.payload,
		};

	case SET_COUNTDOWN:
		return { ...state, resetCountDown: action.payload}

	default:
		return state
  }
};


