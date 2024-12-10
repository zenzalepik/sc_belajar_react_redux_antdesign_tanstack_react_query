const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
};

const reducersAuth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "LOGOUT":
        return initialState;
    //   return { ...state, user: null };
    default:
      return state;
  }
};

export default reducersAuth;
