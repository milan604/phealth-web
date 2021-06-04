import customHttp from "../helpers/CustomHttp";

export const bookActions = {
  fetchBooks,
  createBook,
  //   showBook,
  updateBook,
  deleteBook,
};

function fetchBooks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `/books`,
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
    },
    url: `/book`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

// function showBook(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json", // TODO: verify from request headers
//     },
//     url: `/books`,
//   };
//   return customHttp(requestOptions).then((response) => {
//     return response;
//   });
// }

function updateBook(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `/book/${id}`,
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
    },
    url: `/book/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
