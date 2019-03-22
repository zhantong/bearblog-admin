import axios from "axios";
import https from "https";

const BASE_URI = "https://127.0.0.1:5000/api/admin";

const client = axios.create({
  baseURL: BASE_URI,
  json: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const request = function(options) {
  const onSuccess = function(response) {
    //console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    //console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      //console.error('Status:', error.response.status);
      //console.error('Data:', error.response.data);
      //console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      //console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
