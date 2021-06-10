import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    signUpProfile: {},
    loading: false,
    lastFetch: null,
  },
  reducers: {
    signUpReceived: (user, action) => {
      user.signUpProfile = action.payload.data;
      user.loading = false;
      user.lastFetch = Date.now();
    },

    signUpRequestFailed: (user, action) => {
      user.loading = false;
    },

    signUpRequested: (user, action) => {
      user.loading = true;
    },
  },
});

export const { signUpRequested, signUpReceived, signUpRequestFailed } =
  slice.actions;
export default slice.reducer;

export const login = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "login",
      method: "POST",
      data,
      callback,
    })
  );
};

export const signUp = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "signup",
      method: "POST",
      data,
      callback,
      onStart: "signUpRequested",
      onSuccess: "signUpReceived",
      onError: "signUpRequestFailed",
    })
  );
};

export const getUser = createSelector(
  (state) => state.entities.user,
  (user) => user
);
