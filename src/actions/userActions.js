import * as actions from './types/userActionTypes'
import firebase from '../common/firebase'

export const loginSuccess = (values) => ({
  type: actions.LOGIN,
  email: values.email,
  password: values.password
})

export const loginFail = (error) => ({
  type: actions.LOGIN_FAILED,
  error: error
})

export const registerFail = (error) => ({
  type: actions.REGISTER_USER_FAILED,
  error: error
})

export const registerUser = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      // if user is registered, we will login automatically
      if (firebase.auth().currentUser) {
        dispatch(loginSuccess(email, password))
      }
    } catch (e) {
      dispatch(registerFail(e))
    }
  }
}

export const authenticateUser = (values) => {
  return async (dispatch) => {
    const {email, password} = values
    try {
      await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)
      if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser)
        dispatch(loginSuccess(values))
      }
    } catch (e) {
      dispatch(loginFail(e))
    }
  }
}
