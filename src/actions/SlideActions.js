import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";

export const slideActions = {
  fetchSlides,
  createSlide,
  showSlide,
  updateSlide,
  deleteSlide,
};

function fetchSlides() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken")

    },
    url: `/phapp/slides`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createSlide(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/slide`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showSlide(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/slides`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateSlide(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/slide/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteSlide(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/slide/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
