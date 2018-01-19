import { notify } from '../helpers/notifications.actions';
import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';

export const SET_CURRENT_ORG = 'SET_CURRENT_ORG';
export const FETCHING_SINGLE_ORG = 'FETCHING_SINGLE_ORG';
export const SET_USER_INFO = 'SET_USER_INFO';

export interface FetchSingleAction {
    type: string;
	fetching: any;
}

export interface  SetSingleOrgAction {
	type: string;
	organization: any;
}

export interface SetUserInfo {
	type: string;
	infoList: any;
	role;
}

export function fetchSingleOrg(fetching: boolean): FetchSingleAction {
	return {
		type: FETCHING_SINGLE_ORG,
		fetching
	}
}

export function setCurrentOrg(organization): SetSingleOrgAction {
	return {
		type: SET_CURRENT_ORG,
		organization
	}
}

export function setUserInfo(infoList, role) {
	return {
		type: SET_USER_INFO,
		infoList,
		role
	}
}

export function getCurrentOrg(id: string) {
	return((dispatch) => {
		dispatch(fetchSingleOrg(true));
		apiCall('http://localhost:3000/organizations/' + id, 'GET', true).then((response) => {
			dispatch(setCurrentOrg(response.organization));
		}).catch((err) => {
			console.log('error?');
			dispatch(fetchSingleOrg(false));
		});
	});
}

export  function getUsersInfo(usersId: string[], role: string) {
	console.log('called');
	return(async (dispatch) => {	
		const infoList = []
		for(let id of usersId) {
			let result = await apiCall('http://localhost:3000/info/' + id, 'GET', false);
			infoList.push({
				id,
				username: result.info.name
			});
		}
		dispatch(setUserInfo(infoList, role));
	})
}