import { SIGN_IN, SIGN_OUT, SIGN_CHECK, 
         SERVER_ERROR, SERVER_CONNECT } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  signInResultMsg: null,
  serverResponding: true,
  serverMsg: null,
  serverErrorType: null,
  trustedUser: true,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, 
               isSignedIn: true, 
               userId: action.payload.userId,
               signInResultMsg: action.payload.signInResultMsg,
               serverResponding: true,
               serverMsg: null,
               serverErrorType: null,
               trustedUser: action.payload.trustedUser
      }
    case SIGN_OUT:
      return { ...state, 
               isSignedIn: false, 
               userId: null,
               signInResultMsg: action.payload.signInResultMsg };
    case SIGN_CHECK:
      return { ...state, 
               signInResultMsg: action.payload.signInResultMsg };
    case SERVER_ERROR:
        return { ...state, 
          serverMsg: action.payload.serverMsg,
          serverErrorType: action.payload.serverErrorType,
          serverResponding: false
        };
    case SERVER_CONNECT:
        return { ...state, 
            serverMsg: 'Server now Responding...',
            serverErrorType: null,
            serverResponding: true
         };

    default:
      return state;
  }
};
