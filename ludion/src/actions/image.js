
import {
    SET_IMAGE_INDEX,
    SET_IMAGE_NB,
} from './types';

export const setImageIndex = (video_play=false) =>  {
    return { 
	type: SET_IMAGE_INDEX,
	payload: video_play
    }
}

export const setImageNb = (nb) => {
    return {
	type: SET_IMAGE_NB,
	payload: nb
    }
   
}
