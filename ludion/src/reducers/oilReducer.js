
import { SET_OIL_RUN, SET_OIL_RUN_STATUS,
		 START_OIL_RUN,
		 UPDATE_LONGLAT,
         UPDATE_LONGLAT_MINUTES,
		 UPDATE_RUNNAME,
		 SHOW_MAP,		 
		 SET_OIL_RUN_DETAIL,
	   } from '../actions/types.js';

const INITIAL_STATE = {
	json : false,
	startOilRun: false,
	isMapShown: false,
	oilRunStatus: {},
	oilRunDetail: {},
	longitude: 50.50,
	latitude: 27,
    longitude_degree : 50,
    longitude_minute : 30,
    latitude_degree : 27,
    latitude_minute : 0,
}

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_OIL_RUN:
		return { ...state,  startOilRun: false,
							oilRunStatus: action.payload};

	case START_OIL_RUN:
		return { ...state,  startOilRun: action.payload};

	case SET_OIL_RUN_STATUS:
		return { ...state, oilRunStatus: action.payload}

	case SET_OIL_RUN_DETAIL:
		return { ...state, oilRunDetail: action.payload}

	case UPDATE_LONGLAT:
		return { ...state, longitude: action.payload.longitude,
						   latitude: action.payload.latitude}

	case UPDATE_LONGLAT_MINUTES:
	  return { ...state,
               longitude_degree: action.payload.longitude_degree,
               longitude_minute: action.payload.longitude_minute,
			   latitude_degree: action.payload.latitude_degree,
               latitude_minute: action.payload.latitude_minute,
               longitude: Math.floor((parseFloat(action.payload.longitude_degree)+
                                      parseFloat(action.payload.longitude_minute)/60.)*100.)/100.,
               latitude: Math.floor((parseFloat(action.payload.latitude_degree)+
                                     parseFloat(action.payload.latitude_minute)/60.)*100.)/100.,
             }

	case UPDATE_RUNNAME:
		return { ...state, run_name: action.payload.run_name}

      
	case SHOW_MAP:
		return { ...state, isMapShown: action.payload}

	default:
		return state
  }
};


