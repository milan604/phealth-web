import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";

export const bookActions = {
  fetchBooks,
  createBook,
  showBook,
  updateBook,
  deleteBook,
};

function fetchBooks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken")
    },
    url: `/phapp/books`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createBook(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/book`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showBook(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/books`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateBook(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/book/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteBook(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/book/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
