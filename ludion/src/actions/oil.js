// import socket from '../lib/socket';
// import history from '../lib/history'


// import {
//     START_OIL_RUN,
//     SET_LOG,
//     SET_OIL_RUN,
//     SET_OIL_RUN_DETAIL,
//     SET_OIL_RUN_STATUS,
//     OIL_FORM,
//     OIL_RUNS,
//     UPDATE_LONGLAT,
//     UPDATE_LONGLAT_MINUTES,
//     UPDATE_RUNNAME,
//     SHOW_MAP,
//     CLEAN_PREVIOUS,
//     SET_OIL_DELETION_MESSAGE,
// } from './types';
// import { 
//     DELETE_OIL_RUN,
// } from '../config/comm';






// export const setOilRuns =  (ref) => {

//     return ({
//         type: SET_LOG,
//         payload: { content: "oil_form",
//             log_type: OIL_RUNS}
//     })
// }

// export const goOilRuns  = (row) => ( dispatch, getState) => {
//     const { target, from_date, attempt } = row

//     dispatch({ 
//         type: CLEAN_PREVIOUS
//     })

//     history.push(`/job/${target}/${from_date}/${attempt}/spill_runs`)
// }

// export const goOilForm = (row) => ( dispatch, getState) => {
//     const { target, from_date, attempt } = row

//     dispatch({ 
//         type: CLEAN_PREVIOUS
//     })

//     history.push(`/job/${target}/${from_date}/${attempt}/spill_new`)
// }

// export const setOilForm =  (ref) => {

//     return ({
// 	type: SET_LOG,
// 	payload: { content: "oil_form",
// 		   log_type: OIL_FORM}
//     })
// }

// export const startOilRun = (params, cookies) => ( dispatch, getState) => {

//     socket.emit(START_OIL_RUN, params);
// 	console.log("TCL: startOilRun -> params", params)

//     const { target, from_date, attempt } = getState().ui.row;

//     history.push(`/job/${target}/${from_date}/${attempt}/spill_runs`)
//     // dispatch( {
//     //     type: START_OIL_RUN,
//     //     payload: params
//     // })
// }



// export const deleteOilRun = (rowToDelete) => ( dispatch, getState) => {

//     socket.emit(DELETE_OIL_RUN, rowToDelete);

//     dispatch( {
//         type: SET_OIL_DELETION_MESSAGE,
//         payload: `deleting spill {rowToDelete.run_name}...`
//     })
// }


// export const setOilRun = (params) => {
    
//     return {
//         type: SET_OIL_RUN,
//         payload: params
//     }
// }

// export const setOilRunStatus = (params) => (dispatch, getState) => {
    
//     const { oilRunStatus } = getState().oil;
//     const { status, reference } = params;

//     var oilRunStatus_new = { ...oilRunStatus};
//     oilRunStatus_new[reference] = status;

//     dispatch( {
//         type: SET_OIL_RUN_STATUS,
//         payload: oilRunStatus_new
//     })
// }


// export const setRunName = ( run_name  ) => {
//     return {
// 	type: UPDATE_RUNNAME,
// 	payload: { run_name }
//     }
// }

// export const setLongLat = ( longitude, latitude  ) => {
//     return {
// 	type: UPDATE_LONGLAT,
// 	payload: { longitude, latitude}
//     }
// }

// export const setLongLatMinutes = ( longitude_degree, longitude_minute, latitude_degree, latitude_minute  ) => {
//     return {
// 	type: UPDATE_LONGLAT_MINUTES,
// 	    payload: { longitude_degree, longitude_minute, latitude_degree, latitude_minute}
//     }
// }



// export const setOilRunDetail = ( row  ) => {
//     return {
// 	type: SET_OIL_RUN_DETAIL,
// 	payload: row
//     }
// }

// export const showMap = (isMapShown) => {
//     return {
//         type: SHOW_MAP,
//         payload: isMapShown
//     }
// }
