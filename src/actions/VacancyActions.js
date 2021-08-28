import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";

export const vacancyActions = {
  fetchVacancies,
  createVacancy,
  showVacancy,
  updateVacancy,
  deleteVacancy,
};

function fetchVacancies() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken")

    },
    url: `/phapp/vacancies`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createVacancy(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/vacancy`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showVacancy(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/vacancies`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateVacancy(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/vacancy/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteVacancy(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken") // TODO: verify from request headers
    },
    url: `phapp/vacancy/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
