import firebase from '../../common/firebase'

export const realtimeProductListeners = (dispatch, state) => {
  const userId = state.user.uid
  const productsRef = firebase.database().ref('/products')
  const userProductsRef = firebase.database().ref('/products')
    .orderByChild('ownerKey').equalTo(userId)
  productsRef.on('child_added', addProductFromListener(dispatch))
  productsRef.on('child_changed', updateProductFromListener(dispatch))
  productsRef.on('child_removed', deleteProductFromListener(dispatch))
  userProductsRef.on('child_added', addUserProductFromListener(dispatch))
}

export const addUserProductFromListener = (dispatch) => {
  return async (data) => {
    const product = await getProductWithUserData(dispatch, data)
    dispatch({ type: 'ADD_USER_PRODUCT', product: product })
  }
}

export const addProductFromListener = (dispatch) => {
  return async (data) => {
    const product = await getProductWithUserData(dispatch, data)
    dispatch({ type: 'ADD_PRODUCT', product: product })
  }
}

export const deleteProductFromListener = (dispatch) => {
  return async (data) => {
    const product = data.val()
    product.key = data.key
    dispatch({ type: 'DELETE_PRODUCT', product: product })
  }
}

export const updateProductFromListener = (dispatch) => {
  return async (data) => {
    const product = await getProductWithUserData(dispatch, data)
    dispatch({ type: 'UPDATE_PRODUCT', product: product })
  }
}

export const getProductWithUserData = async (dispatch, data) => {
  const product = data.val()
  product.key = data.key
  let user = firebase.database().ref('/users')
  user = await user.orderByKey().equalTo(product.ownerKey).once('value')
  console.log(user)
  product.productOwner = user.name
  product.ownerAvatar = user.avatar
  return product
}
