import { APIClient } from "../helper/Api.helper";

const api = new APIClient();

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const Login = (url, data) => api.create(url, data);
export const Register = (url, data) => api.create(url, data);
export const Logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
