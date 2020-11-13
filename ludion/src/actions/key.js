import history from '../lib/history';

import { setQuery } from './table'
import { askRun, askOilRun, setVersion } from './comm';
import { FRONT_DISPLAY, TABLE_DISPLAY, SET_DISPLAY, NAV_DISPLAY, SHOW_MAP, SET_PAGINATION, FORECAST_TARGET } from './types';
import { VERSION_PROD, VERSION_DEV } from '../config/comm';

//  handling key event

export const KEY_TAB   = 9;
export const KEY_RET   = 13;
export const KEY_SPC   = 32;
export const KEY_DOWN  = 40;
export const KEY_UP    = 38;
export const KEY_RIGHT = 39;
export const KEY_LEFT  = 37;
export const KEY_ESC   = 27;
export const KEY_7     = 55;
export const KEY_d     = 68;
export const KEY_f     = 70;
export const KEY_g     = 71;
export const KEY_h     = 72;
export const KEY_i     = 73;
export const KEY_l     = 76;
export const KEY_n     = 78;
export const KEY_o     = 79;
export const KEY_p     = 80;
export const KEY_r     = 82;
export const KEY_s     = 83;
export const KEY_t     = 84;
export const KEY_u     = 85;
export const KEY_w     = 87;
export const KEY_x     = 88;
export const KEY_f1    = 112;
export const KEY_f2    = 113;
export const KEY_f3    = 114;
export const KEY_f4    = 115;
export const KEY_f5    = 116;
export const KEY_f6    = 117;
export const KEY_f7    = 118;
export const KEY_f8    = 119;
export const KEY_f9    = 120;
export const KEY_f10   = 121;
export const KEY_f11   = 122;



export const handleKeyEvent = (key) =>  (dispatch, getState) => {
	
	const currentFocus = document.activeElement.className;
	const { displayType } = getState().ui;
	const { version }   = getState().comm;
	const { isMapShown } = getState().oil

	// console.log('action keycode pressed :',key, 'displayType', displayType);
	// console.log('document.activeElement :', document.activeElement);
	// console.log('currentFocus', currentFocus);


	// all display
	// switch(key) {
	//   case KEY_TAB:
	//     dispatch(computeChangeDisplay(getState));
	//     return false;
	//   default:
	// }

	// if in an input box do nothing forward the event
    // console.log('currentFocus', currentFocus)
	if (currentFocus.indexOf("-input")>-1) {
		return true;
	}

    if (displayType === FRONT_DISPLAY) {
        return true;
    }
    
	if (key === KEY_x) {
        dispatch(setVersion( ( version === VERSION_PROD) ? VERSION_DEV : VERSION_PROD ));
		dispatch(askRun());
		return false;
	}		

	if (displayType === NAV_DISPLAY && isMapShown) {
		switch(key) {

		case KEY_ESC:
			dispatch( { type: SHOW_MAP,
				payload: !isMapShown
			})
			return false; 
			
		default:
		}
	}

	if (displayType === NAV_DISPLAY && !isMapShown) {
		switch(key) {

		case KEY_ESC:
			dispatch( { type: SET_DISPLAY,
				payload: { displayType: TABLE_DISPLAY} } );
   			history.push('/job');
			return false;            

		case KEY_u:
            console.log('update key pressed');
			dispatch(askRun());
			return false;

		case KEY_d:
			dispatch(setVersion(VERSION_DEV));
			return false;

		default:
		}      
	}  

	if (displayType === TABLE_DISPLAY) {

		switch(key) {
			
		case KEY_ESC : 
			dispatch( setQuery({}));
			return false;
			
		case KEY_t:
			dispatch(setQuery({target:"TEST"}));
			return false;
			
		case KEY_f:
			dispatch(setQuery({target:"FORECAST"}));
			return false;
			
		case KEY_p:
			dispatch(setQuery({target:"PROD"}));
			return false;
			
		case KEY_s:
			dispatch(setQuery({target:"SPILL"}));
			return false;
			
		case KEY_d:
			dispatch(setVersion(VERSION_DEV));
			dispatch(askRun());
			return false;
			
		case KEY_u:
			dispatch(askRun());
			return false;

		case KEY_o:
			dispatch(askOilRun());
			return false;

		case KEY_DOWN:
			goPage(+1, dispatch, getState)
			return false;

		case KEY_UP:
			goPage(-1, dispatch, getState)
			return false;

		default:
		}

		// console.log('keycode pressed but not trapped :',key);
		return true
	}
}


export const goPage = (addPage, dispatch, getState) => {
	let page_new;
	
	const {pagination } = getState().tableForecast;
	const { json } = getState().comm;
	const {page, perPage} = pagination;
	
	if (addPage<0) {
		page_new  = (page>1) ? (page - 1) : 1;
	}
	if (addPage>0) {
		page_new = ((page) >= (Math.ceil(json.length/perPage)-1))     ? page :  page + 1;
	}
	
	var pagination_new = { page: page_new, perPage}
	// console.log('pagination_new', pagination_new)
	dispatch({ type: SET_PAGINATION, 
		payload: pagination_new,
		target: FORECAST_TARGET
	}); 
	
	return false;

}
