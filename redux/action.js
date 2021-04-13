import * as acttiontypes from './actiontypes'
export const LOGINSUCCESS = (response) => {
	return {
		type: acttiontypes.LOGINSUCCESS,
		payload: response,
	}
}

export const LOGINOUTUSER = () => {
	return {
		type: acttiontypes.LOGINOUTUSER,
	}
}
export const SYNCUSERDATA = (userData) => {
	return {
		type: acttiontypes.SYNCUSERDATA,
		payload: userData,
	}
}

export const GETUSERNOTESSUCCESS = (userNotes) => {
	return {
		type: acttiontypes.GETUSERNOTESSUCCESS,
		payload: userNotes,
	}
}
export const GETPHOTOGRAPHERSSUCCESS = (data) => {
	return {
		type: acttiontypes.GETPHOTOGRAPHERSSUCCESS,
		payload: data,
	}
}
export const SETMYLOCATION = (data) => {
	return {
		type: acttiontypes.SETMYLOCATION,
		payload: data,
	}
}
export const GETMYBOOKINGSUCCESS = (data) => {
	return {
		type: acttiontypes.GETMYBOOKINGSUCCESS,
		payload: data,
	}
}
