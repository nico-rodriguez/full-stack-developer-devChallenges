import { Link, useNavigate } from 'react-router-dom';

import { Form } from '../../components/Form/Form';
import userService from '../../services/user';

import logo from '../../assets/images/devchallenges.svg';

export default function Login() {
  const navigate = useNavigate();

  const handleFormData = async (username, password) => {
    const successfulLogin = await userService.login(username, password);
    if (successfulLogin) {
      navigate('/profile');
    }
  };

  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='main__header-2'>Login</h2>
      <Form buttonText='Login' handleFormData={handleFormData} />
      <div className='main__footer'>
        Don't have an account yet?{' '}
        <Link className='main__link' to='/signup'>
          Register
        </Link>
      </div>
    </main>
  );
}
