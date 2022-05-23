import axios from 'axios';

const signup = async (username, password) => {
  try {
    await axios.post('/api/v1/signup', { username, password });

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
};

const login = async (username, password) => {
  try {
    await axios.post('/api/v1/login', { username, password });

    return true;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        alert('Invalid username or password.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    console.error(error.config);
  }

  return false;
};

const userService = { signup, login };

export default userService;
