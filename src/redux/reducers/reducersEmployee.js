// Reducer untuk data yang akan kita simpan
const initialState = {
  employees: [],
};

const reducersEmployee = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducersEmployee;
