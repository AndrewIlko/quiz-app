import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToken: sessionStorage?.getItem("token") != null ? true : false,
  image: "",
  isLoaded: false,
  email: "",
  bestResult: 0,
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
    setBestResult: (state, action) => {
      if (state.bestResult < action.payload) {
        state.bestResult = action.payload;
      }
    },
    setData: (state, action) => {
      state.image = action.payload.image;
      state.isLoaded = true;
      state.email = action.payload.email;
      state.bestResult = action.payload.bestResult;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
