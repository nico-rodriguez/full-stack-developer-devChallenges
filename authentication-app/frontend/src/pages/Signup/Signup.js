import React from 'react';
import { Link } from 'react-router-dom';

import { Form } from '../../components/Form/Form';

import logo from '../../assets/images/devchallenges.svg';

export default function Signup() {
  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='main__header-2'>
        Join thousands of learners from around the world{' '}
      </h2>
      <p className='main__content'>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <Form buttonText='Start coding now' />
      <div className='main__footer'>
        Already a member?{' '}
        <Link className='main__link' to='/login'>
          Login
        </Link>
      </div>
    </main>
  );
}
