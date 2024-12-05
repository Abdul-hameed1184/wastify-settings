import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "../Features/authSlice"
import adminSidebarReducer from "../Features/adminSidebarSlice"

const rootReducer = combineReducers({
    // Add your reducers here 
    auth: authReducer,
    sidebar: adminSidebarReducer

    // Add other reducers here
  });
export const store = configureStore({
  reducer: rootReducer,
})