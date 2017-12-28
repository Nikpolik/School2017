import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';

export const SET_ORGINIZATIONS = 'SET_ORGINIZATIONS';
export const FETCHING_ORGS = 'FETCHING_ORGS';
export const STOPPED_FETCHING = 'STOPPED_FETCHING';

//create common interface for org
export interface setOrgsAction {
	type: string;
	orginizations: any;
}


export function fetchingOrgs() {
	return {
		type: FETCHING_ORGS
	}
}

export function stoppedFetching() {
	return {
		type: STOPPED_FETCHING
	}
}
export function setOrgs(orginizations: any): setOrgsAction {
	return {
		type: SET_ORGINIZATIONS,
		orginizations
	}
}

export function getOrgs() {
	return((dispatch) => {
		dispatch(fetchingOrgs());
		apiCall('http://localhost:3000/register', {} , 'POST', false).then((response) => {
			console.log(response);		
		}).catch((err) => {
			console.log(err)
		});			
		dispatch(stoppedFetching());
	});	
}