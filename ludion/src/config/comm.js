// constants

export const LOG_CHUNK_SIZE = 10000;
export const LOG_CHUNK_LINES = 100;

// communication with server via socket.io
export const GET_RUN  = 'GET_RUN';
export const PUSH_RUN  = 'PUSH_RUN';
export const REGISTER_RUN  = 'REGISTER_RUN';

export const GET_LOG= 'GET_LOG';
export const PUSH_LOG= 'PUSH_LOG';
export const PUSH_LOG_CHUNK = 'PUSH_LOG_CHUNK';

export const GET_FILE_LIST= 'GET_FILE_LIST';
export const GET_FILE= 'GET_FILE';
export const PUSH_FILE_LIST= 'PUSH_FILE_LIST';

export const GET_OIL_RUN  = 'GET_OIL_RUN';
export const PUSH_OIL_RUN = 'PUSH_OIL_RUN';
export const PUSH_OIL_RUN_STATUS = 'PUSH_OIL_RUN_STATUS';
export const START_OIL_RUN = 'START_OIL_RUN';
export const DELETE_OIL_RUN = 'DELETE_OIL_RUN';
export const OIL_RUN_DELETED = 'OIL_RUN_DELETED';

export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export const GET_AUTH= 'GET_AUTH';
export const PUSH_AUTH= 'PUSH_AUTH';

// possible version
export const VERSION_PROD = 'VERSION_PROD';
export const VERSION_DEV = 'VERSION_DEV';

// job status
export const UNKNOWN = 'UNKNOWN';
export const SUBMITTED = 'SUBMITTED';
export const RUNNING = 'RUNNING';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

