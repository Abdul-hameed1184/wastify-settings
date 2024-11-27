import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: true,
  }

const adminSidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
      openSidebar: state => {
        state.isOpen = true;
      },
      closeSidebar: state => {
        state.isOpen = false;
      },
      toggleSidebar: state => {
        state.isOpen = !state.isOpen;
      },
    },
});

export const { openSidebar, closeSidebar, toggleSidebar } = adminSidebarSlice.actions;
export default adminSidebarSlice.reducer;