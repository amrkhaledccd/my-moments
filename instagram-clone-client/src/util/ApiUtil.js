import { API_BASE_URL, ACCESS_TOKEN } from "../common/constants";

const request = options => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/users",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/auth/users/me",
    method: "GET"
  });
}

export function uploadImage(uploadImageRequest) {
  return request({
    setContentType: false,
    url: API_BASE_URL + "/media/images",
    method: "POST",
    body: uploadImageRequest
  });
}

export function updateProfilePicture(uri) {
  return request({
    url: API_BASE_URL + "/auth/users/me/picture",
    method: "PUT",
    body: uri
  });
}
