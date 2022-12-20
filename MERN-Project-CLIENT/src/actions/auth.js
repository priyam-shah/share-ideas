import { AUTH } from "../constants/actionTypes.js";

import * as api from "../api/index.js";

// signIn is a function that simply returns an action
// - here -> actions or more specefically action creators are asynchronous
// --  so we have to use redux thunk
// --- ie we have a function that returns an async function with a dispatch
export const signin = (formData, router) => async (dispatch) => {
  try {
    // login the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    // signUp the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
