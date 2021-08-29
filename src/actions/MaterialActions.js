import customHttp from "../helpers/CustomHttp";
import Cookie from "js.cookie";

export const materialActions = {
  fetchMaterials,
  createMaterial,
  showMaterial,
  updateMaterial,
  deleteMaterial,
};

function fetchMaterials() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": Cookie.get("accesstoken")
    },
    url: `/phapp/materials`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createMaterial(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/material`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showMaterial(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/materials`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateMaterial(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/material/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteMaterial(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
      "Authorization": Cookie.get("accesstoken")
    },
    url: `phapp/material/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
