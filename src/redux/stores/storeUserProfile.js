// src/redux/stores/storeUserProfile.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Untuk menggunakan localStorage
import { Provider } from 'react-redux';
import reducersEmployee from '../reducers/reducersEmployee'; // Impor reducer
import reducersAuth from '../reducers/reducersAuth'; // Impor reducer auth


// Setup persist config
const persistConfig = {
  key: 'root',
  storage, // Menggunakan localStorage
  // whitelist: ["employees"], // Simpan hanya employees
};

// Persist reducer
const persistedEmployeeReducer = persistReducer(persistConfig, reducersEmployee);
const persistedAuthReducer = persistReducer(persistConfig, reducersAuth);

// Create Redux store
const rootReducer = combineReducers({
  // employees: persistedReducer,
  employees: persistedEmployeeReducer,
  auth: persistedAuthReducer,
  // auth: persistedAuthReducer(persistConfig, reducersAuth), // Redux Persist untuk reducer auth

});

const store = createStore(rootReducer);

// Persistor untuk Redux Persist
const persistor = persistStore(store);

export { store, persistor };
