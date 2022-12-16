import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToken: sessionStorage?.getItem("token"),
  image: "",
  isLoaded: false,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.isToken = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setData: (state, action) => {
      state.image = action.payload.image;
      state.isLoaded = true;
      state.email = action.payload.email;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
