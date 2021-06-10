import axios from "axios";
import * as actions from "../api";
import { clearAllToken } from "../../services/localStorageServices";
const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      console.log("UNAUTHORIZED", originalRequest.url);
      clearAllToken();
    }
    return Promise.reject(error);
  }
);

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      params,
      onStart,
      onSuccess,
      onError,
      callback = false,
    } = action.payload;
    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: process.env.REACT_APP_APIBASE,
        url,
        method,
        params,
        data,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      if (callback) callback(response);
    } catch (error) {
      // General
      dispatch(actions.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
      if (callback) callback(error.response);
    }
  };

export default api;
