import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfileWrapper from './components/ProfileWrapper/ProfileWrapper';

import Wrapper from './components/Wrapper/Wrapper';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
