import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
      message: [], // Initial state to hold all messages
    },
    reducers: {
      setMessage: (state, action) => {
        // Replace messages when fetching from the API
        if (Array.isArray(action.payload)) {
          state.message = action.payload;
        } else {
          // Append new message for real-time updates
          state.message = [...state.message, action.payload];
        }
      },
    },
  });
  
  export const { setMessage } = messageSlice.actions;
  export default messageSlice.reducer;