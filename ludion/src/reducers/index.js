import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

// import authReducer from './authReducer';
// import { tableReducerForecast, tableReducerSpill }  from './tableReducer';
// import oilReducer  from './oilReducer';
// import commReducer from './commReducer';
// import uiReducer   from './uiReducer';
// import frontReducer from './frontReducer';
import serviceReducer from './serviceReducer';

export default combineReducers({
    // auth         : authReducer,
    // comm         : commReducer,
    // form         : formReducer,
    // oil          : oilReducer,
    // tableForecast: tableReducerForecast,
    // tableSpill   : tableReducerSpill,
    // ui           : uiReducer,
    // front        : frontReducer,
    service      : serviceReducer
});
