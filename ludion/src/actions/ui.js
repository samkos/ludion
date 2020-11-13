// ui actions

import history from '../lib/history'

import {
    ENABLE_REQUEST,
    GO_NAV,
    LOG_DISPLAY, 
    SET_DISPLAY,
    SET_MESSAGE,
    SET_WINDOW_DIMENSIONS,
    TABLE_DISPLAY,
    TEST_DISPLAY,
    UPDATE_MODAL,
    CLEAN_PREVIOUS,
} from './types'

export const goNav = (row) => (dispatch, getState) => {
    dispatch ({
        type: CLEAN_PREVIOUS,
    });
    dispatch ({
        type: GO_NAV,
        payload: row
    });
    dispatch( { type: ENABLE_REQUEST })
    history.push(`/job/${row.target}/${row.from_date}/${row.attempt}`);
}



const computeChangeDisplay = (getState,
                              toDisplay=null, 
                              toNextDisplay = TABLE_DISPLAY) => {

  const { displayType } = getState().ui;
  var displayType_new, video_play;
  
  if (!toDisplay) {
      switch (displayType) {
      case LOG_DISPLAY: displayType_new = TABLE_DISPLAY; video_play = false; break;
      case TABLE_DISPLAY: displayType_new = LOG_DISPLAY; break;
      case TEST_DISPLAY: displayType_new = TABLE_DISPLAY;  video_play = false; break;
      default: displayType_new = displayType;
      } 
      toNextDisplay = displayType_new;
  }
  else {
      displayType_new = toDisplay;
  }  

  return { type: SET_DISPLAY, 
	   payload: {displayType: displayType_new,
		     nextDisplayType: toNextDisplay,
		     video_play: video_play
		    }
  }  
}

export const changeDisplay = (toDisplay=null, toNextDisplay=TABLE_DISPLAY) => (dispatch, getState) => {
    dispatch( computeChangeDisplay(getState, toDisplay, toNextDisplay));
    dispatch({type: ENABLE_REQUEST })
}


export const clearMessage = () => {
    return {
	type: SET_MESSAGE,
	payload: false
    }
}


export const setRow =  (row) => {
    return ({
	type: GO_NAV,
	payload: row,
    })
}

export const setWindowDimensions = ( dimensions  ) => {
    return {
	type: SET_WINDOW_DIMENSIONS,
	payload: dimensions
    }
}


export const setModal = ( modalIsOpen, whichModal  ) => {
    return {
	type: UPDATE_MODAL,
	payload: { modalIsOpen, whichModal}
    }
}

export const sendMessage = ( message, timeout=30000  ) => (dispatch) => {

    dispatch( {
	type: SET_MESSAGE,
	payload: { message, timeout}
    });

    // dispatch( {
    //   type: SET_MESSAGE,
    //   payload: false
    // });
}


