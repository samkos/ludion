// // communication with server
// import socket from '../lib/socket';

// import {
//     ENABLE_REQUEST,
//     GO_NAV,
//     NAV_DISPLAY,
//     OIL_FORM,
//     OIL_RUNS,
//     PLOT_FILES,
//     REGULAR_LOG,
//     SERVER_ERROR,
//     SERVER_CONNECT,
//     SET_COUNTDOWN,
//     SET_LOG,
//     SET_LOG_BACKGROUND,
//     SET_MESSAGE,
//     SET_VERSION,
//     SET_RUN,
//     MOVIE_FILE,
// } from './types';

// import {
//     GET_FILE,
//     GET_FILE_LIST,
//     GET_LOG,
//     GET_RUN,
//     GET_OIL_RUN,
//     LOG_CHUNK_SIZE,
// } from '../config/comm';

// export const serverError = (serverErrorType, serverMsg ) => {
// 	console.log("TCL: serverError -> serverErrorType, serverMsg", serverErrorType, serverMsg)

//     return {
//         type: SERVER_ERROR,
//         payload: { serverErrorType, serverMsg }
//     }
// }

// export const serverConnected = (serverMsg ) => {

//     return {
//         type: SERVER_CONNECT,
//         payload: { serverMsg }
//     }
// }

// export const askRun = () => (dispatch, getState) => {

//     const { displayType } = getState().ui;
//     const { row, version } = getState().comm;

// 	// console.log('askRun version', version)
	
//     if ( displayType === NAV_DISPLAY && row) {
//         const { target, from_date, attempt } = row;
//     	console.log('should update only row...', row);
//         socket.emit(GET_RUN, version, `${target}/${from_date}-${attempt}`);
//     } else {
// 		console.log("TCL: askRun -> will update all", )
//         socket.emit(GET_RUN, version);
//     }
//     return {
// 	type: GET_RUN,
//     }
// }

// export const askOilRun = () => (dispatch, getState) => {

//     const { displayType } = getState().ui;
//     const { row, version } = getState().comm;

// 	// console.log('askRun version', version)
	
//     if ( displayType === NAV_DISPLAY && row) {
//         const { target, from_date, attempt } = row;
//     	// console.log('should update only row...', row);
//         socket.emit(GET_OIL_RUN, version, `${target}/${from_date}-${attempt}`);
//     } else {
// 		// console.log("TCL: askRun -> will update all", )
//         socket.emit(GET_OIL_RUN, version);
//     }
//     return {
// 	type: GET_RUN,
//     }
// }


// export const askLog = (params) => (dispatch, getState ) => {

// 	const { version } = getState().comm;
	
//     socket.emit(GET_LOG, version, params);

//     dispatch( {
// 	type: SET_MESSAGE,
// 	payload: { message:"loading log file...", timeout:100}
//     });

// 	// console.log('in askLog params ', params)
//     dispatch ({
// 	type: GET_LOG,
// 	payload: params
//     });
// }

// export const askFileList = (params) => (dispatch, getState) => {
// 	const { version } = getState().comm;
	
//     //console.log('GET_FILE_LIST in actions called with ',params)
//     socket.emit(GET_FILE_LIST, version, params);

//     dispatch( {
// 	    type: SET_MESSAGE,
// 	    payload: { message:"loading file List...", timeout:100}
//     });
    
//     dispatch( {
// 		type: GET_FILE_LIST,
// 		payload: params
//     });
    
// }

// export const askFile = (i, filePath) => (dispatch) => {
// 	// console.log("TCL: askFile -> i, filePath", i, filePath)
//     socket.emit(GET_FILE, i, filePath);

//     dispatch( {
//     	type: GET_FILE,
// 	    payload: { nb:i, filePath}
//     });
    
// }

// export const setLog =  (log_details = {log:null, checksum:0}) => (dispatch, getState) => {

//     const { log_checksum } = getState().comm;
//     const { log, checksum, no_change } = log_details;

//     const new_log_checksum = { ...log_checksum};
//     new_log_checksum[log] = checksum;
//     var log_details_typed = { ...log_details, log_type: REGULAR_LOG, log_checksum: new_log_checksum};
// 	// console.log("TCL: setLog -> log_details_typed", log_details_typed)

//     if (no_change) {
// 	dispatch ({
// 	    type: ENABLE_REQUEST
// 	})
//     } else {
// 	dispatch ({
// 	    type: SET_LOG,
// 	    payload: log_details_typed
// 	})
//     }
// }


// export const setLogChunk =  (chunk) => (dispatch, getState) => {

//     const { previousAskLog, log_in_background } = getState().comm;
//     const { data, from, total_size } = chunk;

//     console.log('chunk',chunk);
//     if ( previousAskLog === chunk.log) {
//         var new_log_in_background = (from === 0) ? "" : log_in_background;
//         new_log_in_background = new_log_in_background + data;

//         console.log('new_log_in_background :', new_log_in_background);
//         dispatch ({
//             type: SET_LOG_BACKGROUND,
//             payload: new_log_in_background
//         });

//         const new_log_in_background_size = new_log_in_background.length;

//         if ( new_log_in_background_size === total_size || 
//              !(new_log_in_background_size % (LOG_CHUNK_SIZE*4)) ) {
//             console.log(`new_log_in_background_size === total_size  ${new_log_in_background_size} === ${total_size}`)
//             console.log(` ${LOG_CHUNK_SIZE} mod`, new_log_in_background_size % (LOG_CHUNK_SIZE)*4)
//             console.log('log updated!')
//             dispatch ({
//                 type: SET_LOG,
//                 payload: { content: new_log_in_background, log_type: REGULAR_LOG} 
//             })
//         }
//     }
//     else {
//         dispatch ({
//             type: SET_LOG,
//             payload: { content: ` log file ${previousAskLog} discontinued `, log_type: REGULAR_LOG} 
//         });
//     }
// }

// export const setFileList =  (fileList) => (dispatch,getState) => {

//     const {file_type, files } = fileList;

//     if ( file_type === "data" ) {

// 	const content = (files.length) ?  files.join("\n") : "no file produced yet..." ;

// 	dispatch  ({
// 	    type: SET_LOG,
// 	    payload: { content, log_type:file_type}
// 	})
//     } else if ( file_type === PLOT_FILES || file_type === MOVIE_FILE ) {
//         dispatch  ({
//             type: SET_LOG,
//             payload: { content: files, log_type:file_type}
//         })
//     } else {
// 	dispatch  ({
// 	    type: SET_LOG,
// 	    payload:  { content: "unknown component type to display: " + file_type, log_type:"log" }
// 	})

//     }
// }

// export const setVersion = (version) => {
//     return {
// 	type: SET_VERSION,
// 	payload: version
//     }
    
// }


// export const setRun = (json) => (dispatch,getState) => {

//     const { displayType,  resetCountDown, requestOngoing, row } = getState().ui;
//     const { log_checksum, log_type, lastRequest, version } = getState().comm;

//     // updating progressBar setting it back to 100%
//     const resetCountDown_new = (resetCountDown + 1) % 100;

//     // updating table of runs
//     dispatch({type:SET_MESSAGE, payload:{message:"Updating runs status"}});
    
//     // updating countdown
//     dispatch({type:SET_COUNTDOWN, payload:resetCountDown_new});
    

//     // updating table of runs
//     dispatch ({
//         type: SET_RUN,
//         payload: { json}
//     })


//     // updating navigation view 
//     if ( displayType === NAV_DISPLAY) {
//         // finding same row as one curently displayed
//         const matching_row = json.filter( 
//             r => ( (r.target    === row.target) && 
//                 (r.from_date === row.from_date) && 
//                 (r.attempt   === row.attempt) 
//             ));
            
//             if (matching_row.length !== 1 ) {
//                 console.log('row has disappeared!!! was loooking for row=',row)
//             }
//             else {
//                 // console.log('recharging Nav view :');
//                 const updated_row = matching_row[0];
//                 // console.log('updated_row', updated_row)
//                 dispatch({
//                     type: GO_NAV,
//                     payload: updated_row
//                 });
//                 // enable request = unfreeze GUI
//                 dispatch({type: ENABLE_REQUEST})      
//                 // updating the ui_element displayed if one
                
//                 // console.log("TCL: setRun -> lastRequest", lastRequest)
//                 if (!requestOngoing &&
// 					log_type !== OIL_FORM && log_type !== OIL_RUNS
// 					&& lastRequest) {
                    
//                     //console.log('reloading displayed element')
//                     dispatch({type:SET_MESSAGE, payload:{message:"reloading displayed element"}});
                    
//                     if (lastRequest.hasOwnProperty('type')) {
//                         // console.log('reemit lastRequest:', lastRequest)
                        
//                         const { type, payload } = lastRequest;
// 						// console.log("TCL: setRun -> type", type)
                        
//                         if (type === GET_LOG ) {
//                             if (! log_checksum || !log_checksum.hasOwnProperty(payload)) {
//                                 dispatch({type:SET_MESSAGE, payload:{message:"GETLOG ui element with no checksum!!!"}});
//                                 return;
//                             }
                            
//                             const current_checksum = log_checksum[payload];
//                             // console.log('current_checksum :', current_checksum);
//                             socket.emit(type, version, payload, current_checksum  ) ;
//                         } else if ( type === GET_FILE_LIST ) {
//                             socket.emit(type, version, payload) ;
//                         } else  {
//                             socket.emit(type, payload ) ;
//                         }
                        
//                         dispatch(lastRequest);
//                     }
//                     else {
//                         // console.log('cannot reemit last Request:', lastRequest)
//                         dispatch({type:SET_MESSAGE, payload:{message:"Cannot reemit last Request: none yet..."}})
//                     }
//                 }
//             }
//         }
//     }

