import { Login, Register } from "./auth.service";

export function authAction() {
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}`;
  return {
    login,
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
}
