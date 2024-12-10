// src/redux/actions/actionsEmployee.js

// Action untuk menambahkan employee
export const addEmployee = (employee) => ({
  type: 'ADD_EMPLOYEE',
  payload: employee,
});

// Action untuk memperbarui employee
export const updateEmployee = (employee) => ({
  type: 'UPDATE_EMPLOYEE',
  payload: employee,
});

// Action untuk menghapus employee
export const deleteEmployee = (id) => ({
  type: 'DELETE_EMPLOYEE',
  payload: id,
});
