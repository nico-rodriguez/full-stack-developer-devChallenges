import { Link } from 'react-router-dom';

import { Form } from '../../components/Form/Form';

import logo from '../../assets/images/devchallenges.svg';

export default function Login() {
  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='main__header-2'>Login</h2>
      <Form buttonText='Login' />
      <div className='main__footer'>
        Don't have an account yet?{' '}
        <Link className='main__link' to='/signup'>
          Register
        </Link>
      </div>
    </main>
  );
}
