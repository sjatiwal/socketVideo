import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
} from "../constant/user";
import backend from "../../helper/axios";

//LOGIN USER
export const loginuser =
  ({ loginEmail, loginPassword }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST, payload: "Loading...." });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await backend.post(
        `/api/v1/login`,
        { loginEmail, loginPassword },
        config
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    } catch (err) {
      dispatch({ type: USER_LOGIN_FAIL, payload: "Login Failed" });
    }
  };

//REGISTER USER
export const registeruser =
  ({ registerName, registerEmail, registerPhoneNo, registerPassword }) =>
  async (dispatch) => {
    console.log({
      registerName,
      registerEmail,
      registerPhoneNo,
      registerPassword,
    });
    try {
      dispatch({ type: USER_REGISTER_REQUEST, payload: "Loading...." });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await backend.post(
        `/api/v1/register`,
        { registerName, registerEmail, registerPhoneNo, registerPassword },
        config
      );
      console.log({ data });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
    } catch (err) {
      console.log(err, "errrrr");
      dispatch({ type: USER_REGISTER_FAIL, payload: "Login Failed" });
    }
  };

// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST, payload: "Loading..." });

    const { data } = await backend.get(`/api/v1/me`);

    dispatch({ type: USER_LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL, payload: error?.response?.data?.message });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  try {
    await backend.get(`/api/v1/logout`);

    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error });
  }
};

//GET ALL USER

export const getAllusers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST, payload: "Loading..." });

    const { data } = await backend.get("/api/v1/alluser");
    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (err) {
    dispatch({ type: ALL_USER_FAIL, payload: "Error in getting user" });
  }
};
