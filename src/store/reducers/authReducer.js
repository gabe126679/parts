const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_CART_ERROR':
      console.log('cart add error');
      return {
        ...state,
        authError: 'cart add failed'
      }
    case 'UPDATE_CART_SUCCESS':
      console.log('cart add success');
      return {
        ...state,
        authError: null
      }
    case 'DELETE_CART_ERROR':
      console.log('cart delete error');
      return {
        ...state,
        authError: 'cart add failed'
      }
    case 'DELETE_CART_SUCCESS':
      console.log('cart delete success');
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state
  }
};

export default authReducer;