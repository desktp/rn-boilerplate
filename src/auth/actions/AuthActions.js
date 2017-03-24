import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	NAME_CHANGED,
	PHONE_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	LOGOUT
} from './types';

export const inputChanged = (prop, text) => {
	switch (prop) {
		case 'email':
			return {
				type: EMAIL_CHANGED,
				payload: text
			};
		case 'password':
			return {
				type: PASSWORD_CHANGED,
				payload: text
			};
		case 'name':
			return {
				type: NAME_CHANGED,
				payload: text
			};
		case 'phone':
			return {
				type: PHONE_CHANGED,
				payload: text
			};
		default:
			return;
	}
}

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				loginUserFail(dispatch, error);
			});	
	};
};

export const registerUser = ({ email, password, displayName, phone }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				user.updateProfile({ displayName })
					.then(() => {
						console.log(user.uid);
						firebase.database().ref(`/users/${user.uid}`)
							.set({ email, displayName, phone });
						loginUserSuccess(dispatch, user);
					});
			})
			.catch((error) => {
				loginUserFail(dispatch, error);
			});	
	};
};

export const isLoggedIn = (user) => (dispatch) => loginUserSuccess(dispatch, user);

export const logOut = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	Actions.auth({ type: 'reset' });
};

const loginUserFail = (dispatch, error) => {
	let erro = '';
	
	switch (error.code){
		case 'auth/invalid-email':
			erro = 'Insira um e-mail válido';
			break;
		case 'auth/user-disabled':
			erro = 'Usuário desabilitado';
			break;
		case 'auth/wrong-password':
		case 'auth/user-not-found':
			erro = 'E-mail e/ou senha incorretos';
			break;
		case 'auth/email-already-in-use':
			erro = 'E-mail já cadastrado';
			break;
		case 'auth/weak-password':
			erro = 'Senha muito simples. Insira senha mais complexa';
			break;
		default:
			erro = 'Ocorreu um erro. Tente novamente mais tarde';
			break;
	}

	dispatch({ 
		type: LOGIN_USER_FAIL,
		payload: erro
	});
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	
	Actions.main({ type: 'reset' });
};
