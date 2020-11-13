// // authentication

// import socket from '../lib/socket';

// import {
//     SIGN_IN,
//     SIGN_OUT,
//     SIGN_CHECK,
// } from './types';

// import { GET_AUTH } from '../config/comm';

// export const sendEmailForValidation = (email,firstName) => (dispatch,getState) => {

//     // console.log("sending GET_AUTH",email,firstName);
//     socket.emit(GET_AUTH,email,firstName);
//     dispatch ({
//         type: SIGN_CHECK,
//         payload: { userId: email,
//                    signInResultMsg: `Hi ${firstName}. Checking permissions...`}
//     });   

// }

// export const signIn = (email,firstName, trustedUser) => (dispatch,getState) => {
    
//     dispatch ({
//         type: SIGN_IN,
//         payload: { userId: email,
//                    trustedUser: trustedUser,
//                    signInResultMsg: `welcome ${firstName}`}
//     });
// };

// export const signOut = (auth, newSignInResultMsg=null) => (dispatch, getState) => {
    
//     const { signInResultMsg } = getState().auth;
//     //console.log("TCL: signOut -> auth", auth)

//     if (auth) {
//         auth.signOut();
//     }
    
//     dispatch( {
//         type: SIGN_OUT,
//         payload: { signInResultMsg : newSignInResultMsg? newSignInResultMsg : signInResultMsg}
//     });
// };



