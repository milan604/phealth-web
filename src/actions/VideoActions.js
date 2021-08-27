import customHttp from "../helpers/CustomHttp";

export const videoActions = {
  fetchVideos,
  createVideo,
  showVideo,
  updateVideo,
  deleteVideo,
};

function fetchVideos() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },
    url: `/phapp/videos`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function createVideo(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/video`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function showVideo(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/videos`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function updateVideo(values, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/video/${id}`,
    data: values,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}

function deleteVideo(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // TODO: verify from request headers
    },
    url: `phapp/video/${id}`,
  };
  return customHttp(requestOptions).then((response) => {
    return response;
  });
}
