import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    },
    addcomment: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addcomment, setComments } = commentSlice.actions;
export default commentSlice.reducer;
