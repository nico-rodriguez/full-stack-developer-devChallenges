import { Form } from '../../components/Form/Form';
import React from 'react';

import logo from '../../assets/images/devchallenges.svg';

import './Signup.css';

export function Signup() {
  return (
    <main className='signup'>
      <h1 className='signup__header-1'>
        <img src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='signup__header-2'>
        Join thousands of learners from around the world{' '}
      </h2>
      <p className='signup__content'>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <Form />
      <div className='signup__footer'>
        Already a member?{' '}
        <a className='signup__link' href='#'>
          Login
        </a>
      </div>
    </main>
  );
}
