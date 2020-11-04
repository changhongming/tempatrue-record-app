import axios from '../plugins/axios';

export default {
  login: async function (username, password) {
    return axios.post('/login', {
      username,
      password,
    });
  },
  register: async function (username, password, email) {
    return axios.post('/register', {
      username,
      password,
      email,
    })
  }
}
