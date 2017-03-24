import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	NAME_CHANGED,
	PHONE_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	LOGOUT
 } from '../actions/types';

const INITIAL_STATE = { 
	email: '',
	password: '', 
	error: '',
	loading: false,
	user: '',
	displayName: '',
	phone: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, error: '', email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, error: '', password: action.payload };
		case NAME_CHANGED:
			return { ...state, error: '', displayName: action.payload };
		case PHONE_CHANGED:
			return { ...state, error: '', phone: action.payload };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state, error: action.payload, password: '', loading: false };
		case LOGIN_USER:
			return { ...state, error: '', loading: true };
		case LOGOUT:
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
