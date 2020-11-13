import { SET_ROW_AND_LOG, SET_FRONT_ELEMENT } from './types';

export const setRowLogElement =  ( row, log, element, oilRunDetail, run_type  ) => (dispatch, getState) => {

    dispatch ({
        type: SET_ROW_AND_LOG,
        payload: { log, row, oilRunDetail, run_type }
    })

    dispatch ({
        type: SET_FRONT_ELEMENT,
        payload: element
    })
}

export const setFrontElement =  ( element  ) => (dispatch, getState) => {

    dispatch ({
        type: SET_FRONT_ELEMENT,
        payload: element
    })


}
