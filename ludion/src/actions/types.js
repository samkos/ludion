// Action

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_CHECK = 'SIGN_CHECK';
export const SERVER_ERROR = 'SERVER_ERROR';
export const SERVER_CONNECT = 'SERVER_CONNECT';

// data updatded from the server
export const UPDATE_JOBINFO = 'UPDATE_JOBINFO';
export const UPDATE_JSON = 'UPDATE_JSON';
export const UPDATE_LOG = 'UPDATE_LOG';
export const UPDATE_MACHINE = 'UPDATE_MACHINE';
export const UPDATE_MODAL = 'UPDATE_MODAL';
export const UPDATE_LONGLAT = 'UPDATE_LONGLAT';
export const UPDATE_LONGLAT_MINUTES = 'UPDATE_LONGLAT_MINUTES';
export const UPDATE_RUNNAME = 'UPDATE_RUNNAME';
export const CLEAN_PREVIOUS = 'CLEAN_PREVIOUS'


// changing duration,period, or view, using circular choice list
export const CHANGE_DURATION = 'CHANGE_DURATION';
export const CHANGE_PERIOD = 'CHANGE_PERIOD';


// navigating

export const NEXT_PAGE = 'NEXT_PAGE';
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
export const OPEN_MODAL = true;
export const CLOSE_MODAL = false;
export const HELP_MODAL = 'HELP_MODAL';
export const PERIOD_MODAL = 'PERIOD_MODAL';
export const SETTINGS_MODAL = 'SETTINGS_MODAL';

// setting value from a click or internally
export const ENABLE_REQUEST = 'ENABLE_REQUEST';
export const DISABLE_REQUEST = 'DISABLE_REQUEST';
export const SET_FILTERING = 'SET_FILTERING';
export const SET_DISPLAY = 'SET_DISPLAY';
export const SET_RUN = 'SET_RUN';
export const SET_COUNTDOWN = 'SET_COUNTDOWN';
export const SET_VERSION = 'SET_VERSION';
export const SET_LOG = 'SET_LOG';
export const SET_IMAGE_INDEX = 'SET_IMAGE_INDEX';
export const SET_IMAGE_NB = 'SET_IMAGE_NB';
export const SET_LOG_BACKGROUND = 'SET_LOG_BACKGROUND';
export const SET_LOG_CHUNK = 'SET_LOG_CHUNK';
export const SET_FILE_LIST = 'SET_FILE_LIST';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_OIL_RUN = 'SET_OIL_RUN';
export const SET_QUERY = 'SET_QUERY';
export const SET_PAGINATION = 'SET_PAGINATION';
export const SET_SEARCH_COLUMN = 'SET_SEARCH_COLUMN';
export const SET_SORTING_COLUMNS = 'SET_SORTING_COLUMNS';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_WINDOW_DIMENSIONS = 'SET_WINDOW_DIMENSIONS';
export const SET_ROW_AND_LOG = 'SET_ROW_AND_LOG';
export const SET_FRONT_ELEMENT = 'SET_FRONT_ELEMENT';
export const GO_NAV= 'GO_NAV';
export const START_OIL_RUN = 'START_OIL_RUN';
export const SET_OIL_DELETION_MESSAGE = 'SET_OIL_DELETION_MESSAGE';
export const RUN_DELETED = 'RUN_DELETED';
export const SET_OIL_RUN_STATUS = 'SET_OIL_RUN_STATUS';
export const SET_OIL_RUN_DETAIL = 'SET_OIL_RUN_DETAIL';
export const SHOW_MAP = 'SHOW_MAP'
export const SHOW_CONFIRMATION = 'SHOW_CONFIRMATION'

// possible view
export const LOG_DISPLAY = 'LOG_DISPLAY';
export const PROCESS_DISPLAY = 'PROCESS_DISPLAY';
export const TABLE_DISPLAY = 'TABLE_DISPLAY';
export const TEST_DISPLAY = 'TEST_DISPLAY';
export const NAV_DISPLAY= 'NAV_DISPLAY';
export const FRONT_DISPLAY= 'FRONT_DISPLAY';

// possible sub view
export const OIL_FORM = 'OIL_FORM';
export const OIL_RUNS = 'OIL_RUNS';
export const REGULAR_LOG = 'REGULAR_LOG';
export const DATA_FILES = 'data';
export const PLOT_FILES = 'image';
export const MOVIE_FILE = 'movie';


export const FORECAST_TARGET = 'FORECAST_TARGET';
export const SPILL_TARGET = 'SPILL_TARGET';

export const SET_SERVICES = 'SET_SERVICES';