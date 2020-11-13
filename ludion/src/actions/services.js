// table actions

import {
    SET_SERVICES,
} from './types'



export const setServices = (services) => {
    return {
	type: SET_SERVICES,
    payload: services
    }
}

