import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../containers/AppNavigator'

const router = AppNavigator.router
const loginNav = router.getActionForPathAndParams('Login')
const initialState = router.getStateForAction(loginNav)

const navReducer = (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case 'LOGIN':
      nextState = router.getStateForAction(NavigationActions.navigate({routeName: 'ProductsList'}), state)
      break
    case 'SELECT_PRODUCT':
      nextState = router.getStateForAction(NavigationActions.navigate({routeName: 'Product'}), state)
      break
    default:
      nextState = router.getStateForAction(action, state)
      break
  }
  return nextState || state
}

export default navReducer
