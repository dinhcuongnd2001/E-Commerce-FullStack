import { Login, Register } from "./auth.service";

export function authAction() {
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}`;
  return {
    login,
    register,
  };

  function login({ email, password }) {
    return Login(baseUrl + "/auth/login", { email, password })
      .then((result) => {
        console.log("res ::", result);
        const { accessToken } = result.metadata;
        localStorage.setItem("token", accessToken);
        return result;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  function register({ name, email, password }) {
    return Register(baseUrl + "/auth/register", { name, email, password })
      .then((result) => {
        const cuccessfull = result.metadata ? true : false;
        return cuccessfull;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
}
