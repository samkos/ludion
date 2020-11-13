import { TABLE_DISPLAY, SET_PAGINATION, FORECAST_TARGET } from './types';

export const handleWheelEvent = (event) =>  (dispatch, getState) => {
	
	const { displayType } = getState().ui;
	
	if (displayType === TABLE_DISPLAY) {
		// console.log('capture mouse')
		
		let page_new;
		
		const {pagination } = getState().tableForecast;
		const { json } = getState().comm;
		const {page, perPage} = pagination;
		
		if (event.deltaY<0) {
			page_new  = (page>1) ? (page - 1) : 1;
		}
		if (event.deltaY>0) {
			page_new = ((page) >= (Math.ceil(json.length/perPage)-1))     ? page :  page + 1;
		}
		
		var pagination_new = { page: page_new, perPage}
		// console.log('pagination_new', pagination_new)
		dispatch({ type: SET_PAGINATION, 
			payload: pagination_new,
			target: FORECAST_TARGET
		}); 
	}
	
	return false;
}


