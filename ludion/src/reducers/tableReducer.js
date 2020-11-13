import { SET_QUERY,  SET_PAGINATION,
		 SET_SEARCH_COLUMN, SET_SORTING_COLUMNS, SET_COLUMNS, 
		 FORECAST_TARGET, SPILL_TARGET, SHOW_CONFIRMATION, SET_OIL_DELETION_MESSAGE
      } from '../actions/types.js';

import { TABLE_LINES_PER_PAGE } from '../config/ui.js';

const INITIAL_STATE = {
	activeColumns: null,
	query: { target: 'FORECAST'},
	pagination: {page:1, perPage:TABLE_LINES_PER_PAGE},
	searchColumn: 'all',
	sortingColumns: null,
    isConfirmationShown: false,
    rowToDelete: null,
    deletionMessage: "...",
    deletionButton: null,
}

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

	case SET_QUERY:
		return { ...state,  query: action.payload };

	case SET_PAGINATION:
	//   console.log("TCL: tableReducer -> action.payload", action.payload)
	return { ...state,  pagination: action.payload};

	case SET_SEARCH_COLUMN:
		return { ...state,  searchColumn: action.payload};

	case SET_SORTING_COLUMNS:
		return { ...state,  sortingColumns: action.payload};

	case SET_COLUMNS:
		return { ...state,  activeColumns: action.payload};

    case SHOW_CONFIRMATION:
	  return { ...state,
               isConfirmationShown: action.payload.isConfirmationShown,
               rowToDelete: action.payload.rowToDelete,
               deletionMessage: action.payload.deletionMessage,
               deletionButton: action.payload.deletionButton
             };

    case SET_OIL_DELETION_MESSAGE:
	  return { ...state,
               deletionMessage: action.payload.deletionMessage,
               deletionButton: action.payload.deletionButton
             }


	default:
		return state
  }
};


function createNamedWrapperReducer(reducerFunction, reducerTarget) {
	return (state, action) => {
	  const { target } = action
	  const isInitializationCall = state === undefined
	//   console.log("TCL: createNamedWrapperReducer -> target, action, reducerTarget", target, action, reducerTarget)
	  if (target !== reducerTarget && !isInitializationCall) {
		// console.log('not calling reducer  target !== reducerTarget',target !== reducerTarget,"!isInitializationCall",!isInitializationCall)
		return state
	  }
	//   console.log('calling reducer', reducerTarget)
	  return reducerFunction(state, action)
	}
  }
  


export const tableReducerForecast = createNamedWrapperReducer(tableReducer, FORECAST_TARGET);
export const tableReducerSpill = createNamedWrapperReducer(tableReducer, SPILL_TARGET);
