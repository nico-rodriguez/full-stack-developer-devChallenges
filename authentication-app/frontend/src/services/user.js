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

const editProfile = async ({ photo, name, bio, phone, email, password }) => {
  const editData = new FormData();
  photo && editData.append('photo', photo, photo.name);
  editData.append('name', name);
  editData.append('bio', bio);
  editData.append('phone', phone);
  editData.append('email', email);
  editData.append('password', password);

  return await axios.post('profile/edit', editData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const saveUserPhoto = (photoURL) => {
  sessionStorage.setItem('userPhoto', photoURL);
};

const getUserPhoto = () => sessionStorage.getItem('userPhoto');

const saveUserName = (name) => {
  sessionStorage.setItem('userName', name);
};

const getUserName = () => sessionStorage.getItem('userName');

const logout = async () => {
  await axios.get('logout');
};

const userService = {
  signup,
  login,
  getProfile,
  editProfile,
  saveUserPhoto,
  getUserPhoto,
  saveUserName,
  getUserName,
  logout,
};

export default userService;
