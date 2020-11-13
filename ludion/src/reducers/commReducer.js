
import { DISABLE_REQUEST,
	     ENABLE_REQUEST,
	     SET_FILE_LIST,
		 SET_LOG, 
         SET_LOG_BACKGROUND,
		 SET_RUN, 
		 SET_VERSION,
		 UPDATE_LOG,
		 CLEAN_PREVIOUS,
         SET_ROW_AND_LOG,
	   } from '../actions/types.js';

import { GET_FILE_LIST, GET_LOG, GET_RUN, VERSION_PROD } from '../config/comm';

const INITIAL_STATE = {
	log: "",
	log_in_background: "",
	log_checksum: { log:"xxx", checksum:"yyy"},
	fileList: [],
	json: {},
	askRun: true,
	askLog: false,
	askFileList: false,
	previousAskLog: false,
	previousAskFileList: false,
	requestOngoing: false,
	lastRequest: {},
	log_path: "not yet",
	version: VERSION_PROD,
	oilRunDetail: null,
    isLoading: false
}

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {

	case CLEAN_PREVIOUS:
		return { ...state, previousAskFileList: false,
						   previousAskLog: false}

	case DISABLE_REQUEST:
		return { ...state,  requestOngoing: true};
		
	case ENABLE_REQUEST:
			return { ...state,  requestOngoing: false};
		
	case GET_RUN:
	  return { ...state,  askRun: true, isLoading:true };

	case GET_LOG:
	  return { ...state,
               askLog: action.payload, 
			   previousAskLog: action.payload,
			   requestOngoing: true, 
			   video_play: false,
			   log_path: action.payload,
			   lastRequest: action,
               isLoading: true
			 };

	case GET_FILE_LIST:
	  return { ...state,
               askFileList: action.payload, 
			   previousAskFileList: action.payload.file_mask,
			   requestOngoing: true,
			   lastRequest: action,
               isLoading: true
			 };
  case SET_LOG:
	//   console.log('log_type@commmreducer', action.payload)
	  return { ...state,
               log: action.payload.content,
			   log_type: action.payload.log_type,
			   log_checksum: action.payload.log_checksum,
			   requestOngoing: false,
			   askFileList: false,
			   askLog: false,
               isLoading:false
						};
	case SET_LOG_BACKGROUND:
		return { ...state,  log_in_background: action.payload
						};

	case SET_FILE_LIST:
		return { ...state,  fileList: action.payload,
							requestOngoing: false,
							askFileList: false,
							previousAskFileList: state.askFileList
						    };

	case SET_RUN:
	  return { ...state,
               json: action.payload.json,
			   resetCountDown: action.payload.resetCountDown,
			   askRun: false,
               //isLoading: false,
			 };

	case UPDATE_LOG:
	  return { ...state,
               log: action.payload.log,
			   json: action.payload.json,
			   tableContent : action.payload.tableContent,
			   columns: action.payload.columns,
			   // displayType: state.nextDisplayType,
			   askLog: false,
			   previousAskLog: state.askLog,
               isLoading: true,
			 };

    case SET_VERSION:
		return { ...state, version:action.payload }

	case SET_ROW_AND_LOG:
	  return { ...state, 
		       log:action.payload.log,
			   row:action.payload.row,
			   run_type: action.payload.run_type,
			   oilRunDetail: action.payload.oilRunDetail
			   }
		
	default:
		return state
  }
};


