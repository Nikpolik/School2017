import { notify } from '../helpers/notifications.actions';
import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';
import { State } from '../../interfaces';

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
		apiCall('organizations/' + id, 'GET', true).then((response) => {
			console.log(response.organization);
			const organization = {
				...response.organization,
				projects: response.organization.projects.map((id) => ({id}))
			}
			dispatch(setCurrentOrg({...organization, permissions: response.permissions}));
			dispatch(fetchSingleOrg(false));
		}).catch((err) => {
            console.log(err.message)
			dispatch(fetchSingleOrg(false));
		});
	});
}

export function inviteUser(invitedUser: string, role) {
	return((dispatch, getState: () => State) => {
		const id = getState().app.current._id;
		const data = {
			invitedUser,
			role
		}
		apiCall(`organizations/${id}/invite`, 'POST', true, data).then((response) => {
			if(response.success) {
				dispatch(notify('Created Organization', 'success'));
			}
			dispatch(notify(response.reason, 'error'));
		}).catch((err) => {
			dispatch(notify(err.message, 'error'));
		});
	});
}

export  function getUsersInfo(usersId: string[], role: string) {
	return(async (dispatch) => {	
		const infoList = []
		for(let id of usersId) {
			let result = await apiCall(`user/info/${id}`, 'GET', false);
			infoList.push({
				id,
				username: result.info.name
			});
		}
		dispatch(setUserInfo(infoList, role));
	})
}

export function editOrg(info: any) {
	return((dispatch, getState: () => State) => {
		const id = getState().app.current._id;
		apiCall(`organizations/${id}/edit`, 'POST', true, info).then((response) => {
			if(response.success) {
				dispatch(notify('Edited Organization Info', 'success'));
				dispatch(setCurrentOrg(response.organization));
				return
			}
			dispatch(notify(response.reason, 'error'));
		})
	})
}
