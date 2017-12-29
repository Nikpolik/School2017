import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';

export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const FETCHING_ORGS = 'FETCHING_ORGS';
export const STOPPED_FETCHING = 'STOPPED_FETCHING';

//create common interface for org
export interface setOrgsAction {
	type: string;
	organizations: any;
}


export function fetchingOrgs(fetching: boolean) {
	return {
		type: FETCHING_ORGS,
		fetching
	}
}

export function setOrgs(organizations: any): setOrgsAction {
	return {
		type: SET_ORGANIZATIONS,
		organizations
	}
}

export function getOrgs() {
	return((dispatch) => {
		dispatch(fetchingOrgs(true));
		apiCall('http://localhost:3000/register', {} , 'POST', false).then((response) => {
			console.log(response);		
		}).catch((err) => {
			console.log(err)
		});			
		dispatch(fetchingOrgs(false));
	});	
}