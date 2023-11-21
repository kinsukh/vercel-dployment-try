import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientID= '51e1e695a2f74e269f3c418fb12a9458';               // Arpits Client ID
// const clientID= '6297850670d946dea621cf910915b411';                  // Kinsukhs Client ID           
const redirectUri = "http://localhost:3000/dashboard";
const scopes = ["user-library-read"];

export const loginEndpoint = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;