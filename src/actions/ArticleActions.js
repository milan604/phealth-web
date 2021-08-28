import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";

export const articleActions = {
  fetchArticles,
  createArticle,
  showArticle,
  updateArticle,
  deleteArticle,
};

function fetchArticles() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken")

    },
    url: `/phapp/articles`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createArticle(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/article`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showArticle(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/articles`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateArticle(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/article/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteArticle(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/article/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
