import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

//création d'un interceptor pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("error.response", error.response);
      return Promise.reject(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("error.request", error.request);
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return Promise.reject(error.message);
    }
  }
);

//création d'un intercepteur avant la requête pour ajouter un token d'authentification
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
