import axios from "axios";

// config axios
axios.defaults.headers.post["Content-Type"] = "application/json";

// middleware

axios.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    const { message } = error.response.data;
    return Promise.reject(message);
  }
);

const setAuthorization = () => {
  const tokenStr = localStorage.getItem("token");
  console.log("tokenStr :: ", token);
  const token = tokenStr ? JSON.parse(tokenStr) : null;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common["Authorization"];
};

class APIClient {
  getWithToken = (url, params) => {
    setAuthorization();
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`);
    } else {
      response = axios.get(`${url}`);
    }
  };

  createWithToken = (url, payload) => {
    setAuthorization();
    return axios.post(url, payload);
  };

  updateWithToken = (url, payload) => {
    setAuthorization();
    return axios.put(url, payload);
  };

  deleteWithToken = (url, payload) => {
    setAuthorization();
    return axios.delete(url, payload);
  };

  get = (url, params) => {
    removeAuthorization();
    let response;
    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`);
    } else {
      response = axios.get(`${url}`);
    }
    return response;
  };

  create = (url, data) => {
    removeAuthorization();
    return axios.post(url, data);
  };

  update = (url, data) => {
    removeAuthorization();
    return axios.put(url, data);
  };

  delete = (url, config) => {
    removeAuthorization();
    return axios.delete(url, { ...config });
  };
}

export { APIClient };
