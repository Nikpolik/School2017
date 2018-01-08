import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';

export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const FETCHING_ORGS = 'FETCHING_ORGS';
export const STOPPED_FETCHING = 'STOPPED_FETCHING';

//create common interface for org
export interface SetOrgsAction {
	type: string;
	organizations: any;
	role: string;
}

export interface FetchAction {
	type: string;
	fetching: boolean;
}

export function fetchingOrgs(fetching: boolean): FetchAction {
	return {
		type: FETCHING_ORGS,
		fetching
	}
}

export function setOrgs(organizations: any, role: string): SetOrgsAction {
	return {
		type: SET_ORGANIZATIONS,
		organizations,
		role
	}
}

export function getOrgs(role: string) {
	return((dispatch) => {
		dispatch(fetchingOrgs(true));
		apiCall('http://localhost:3000/organizations/?role=' + role, 'GET', true).then((response) => {
			dispatch(setOrgs(response.organizations, role));		
		}).catch((err) => {
			console.log(err)
		});			
		dispatch(fetchingOrgs(false));
	});	
}