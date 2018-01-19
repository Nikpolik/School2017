import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';
import { Organization } from '../../interfaces';
import { notify } from '../helpers/notifications.actions';


export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const FETCHING_ORGS = 'FETCHING_ORGS';
export const APPEND_SINGLE_ORG = 'APPEND_SINGLE_ORG';
export const SET_CURRENT_ORG = 'SET_CURRENT_ORG';

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

export interface AppendOrgAction {
	type: string;
	role: string;
	organization: Organization;
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
		role,
	}
}

export function appendSingleOrg(role: string, organization: Organization): AppendOrgAction {
	return {
		type: APPEND_SINGLE_ORG,
		role,
		organization
	}
}

export function createOrg(name: string, description: string) {
	return((dispatch) => {
		dispatch(fetchingOrgs(true));
		apiCall('organizations/create', 'POST', true, {name, description}).then((response) => {
			if(response.success) {
				dispatch(appendSingleOrg('owner', response.organization));
				dispatch(notify('Created Organization', 'success'))		
			}
		}).catch((err) => {
			console.log(err);
		});
		dispatch(fetchingOrgs(false));
	});
}

export function getOrgs(role: string) {
	return((dispatch) => {
		dispatch(fetchingOrgs(true));
		apiCall('organizations/?role=' + role, 'GET', true).then((response) => {
			dispatch(setOrgs(response.organizations, role));
		}).catch((err) => {
			console.log(err)
			dispatch(fetchingOrgs(false));
		});			
	});	
}
