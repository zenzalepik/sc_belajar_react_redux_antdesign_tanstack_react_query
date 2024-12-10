export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
  });
  
  export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    payload: data,
  });
  

  export const loginFail = (error) => ({
    type: 'LOGIN_FAIL',
    payload: error,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  