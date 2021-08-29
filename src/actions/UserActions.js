import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";


export const userActions = {
  fetchToken,
  logout,
};

function fetchToken(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/authenticate`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function logout() {
    Cookie.remove('accesstoken', { path: '/' })
    Cookie.remove('expiry', { path: '/' })
    Cookie.remove('role', { path: '/' })
    Cookie.remove('uid', { path: '/' })
    window.location.href = '/'
}
