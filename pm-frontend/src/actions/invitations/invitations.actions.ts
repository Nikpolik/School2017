import { Dispatch, Action } from 'redux';
import apiCall from '../../api/index';
import { State } from '../../interfaces';

export const FETCHING_INVS = 'FETCHING_INVS';
export const SET_INVITATIONS = 'SET_INVITATIONS';

export interface FetchAction extends Action {
    fetching: boolean
}

export interface SetInvsAction extends Action {
    invitations: any[]
}

function changeFetch(fetching): FetchAction {
    return {
        type: FETCHING_INVS,
        fetching
    }
}

export function setInvitations(invitations): SetInvsAction {
    return {
        type: SET_INVITATIONS,
        invitations
    }
}

export function getInvitations() {
    return (dispatch) => {
        dispatch(changeFetch(true));
        apiCall('user/invitations', 'GET', true).then((response) => {
            dispatch(setInvitations(response.invitations));
            dispatch(changeFetch(false));
        }).catch((err) => {
            console.log(err.message)
            dispatch(changeFetch(false));
        })
    }
}

export function accept(id: string) {
    console.log(id);
    return ((dispatch) => {
        apiCall(`organizations/${id}/accept`, 'POST', true).then((response) => {
            if(response.success) {
                dispatch(setInvitations(response.invitations));
            }
        })
    })
}