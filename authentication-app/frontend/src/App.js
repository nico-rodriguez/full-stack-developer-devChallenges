import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import Wrapper from 'components/Wrapper';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Edit from 'pages/Profile/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' />} />
        <Route path='/' element={<Wrapper />}>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/profile' element={<ProfileWrapper />}>
          <Route path='' element={<Profile />} />
          <Route path='edit' element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
