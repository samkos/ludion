// table actions

import {
    SET_FILTERING,
    SET_QUERY,
    SET_PAGINATION,
    SET_SEARCH_COLUMN,
    SET_SORTING_COLUMNS,
    SET_COLUMNS,
    SHOW_CONFIRMATION,
    FORECAST_TARGET,
    SET_OIL_DELETION_MESSAGE
} from './types'



export const setFiltering = (nbNodes, user) => {
    return {
	type: SET_FILTERING,
    payload: {nbNodes, user},
    target: FORECAST_TARGET
    }
}


export const setQuery = (query) => {
    return {
	type: SET_QUERY,
    payload: query,
    target: FORECAST_TARGET
    }
}

export const setPagination = (pagination) => {
    return {
	type: SET_PAGINATION,
    payload: pagination,
    target: FORECAST_TARGET
    }
}


export const setSearchColumn = (searchColumn) => {
    return {
	type: SET_SEARCH_COLUMN,
    payload: searchColumn,
    target: FORECAST_TARGET
    }
}

export const setSortingColumns = (sortingColumns  ) => {
    return {
	type: SET_SORTING_COLUMNS,
    payload: sortingColumns,
    target: FORECAST_TARGET
    }
}

export const setColumns = (columns  ) => {
    return {
	type: SET_COLUMNS,
    payload: columns,
    target: FORECAST_TARGET
    }
}


export const showConfirmation = (isConfirmationShown,rowToDelete, deletionMessage, deletionButton) => {
    return {
        type: SHOW_CONFIRMATION,
        payload: { isConfirmationShown, rowToDelete, deletionMessage, deletionButton},
        target: FORECAST_TARGET
    }
}


export const setOilDeletionMessage = (deletionMessage, deletionButton) => {
    return {
        type: SET_OIL_DELETION_MESSAGE,
        payload: { deletionMessage, deletionButton},
        target: FORECAST_TARGET
    }
}
    
