import customHttp from "../helpers/CustomHttp";

export const scholarshipActions = {
  fetchScholarships,
  createScholarship,
  showScholarship,
  updateScholarship,
  deleteScholarship,
};

function fetchScholarships() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },
    url: `/phapp/scholarships`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createScholarship(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/scholarship`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showScholarship(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/scholarships`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateScholarship(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/scholarship/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteScholarship(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/scholarship/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
