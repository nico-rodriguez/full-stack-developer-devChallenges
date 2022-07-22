import axios from 'lib/axios';

const signup = async (username, password) => {
  await axios.post('signup', { username, password });
};

const login = async (username, password) => {
  await axios.post('login', { username, password });
};

const getProfile = async () => {
  const user = await axios.get('profile');
  return user;
};

const logout = async () => {
  await axios.get('logout');
};

const userService = { signup, login, getProfile, logout };

export default userService;
