import React from 'react';

import facebookLogo from './Facebook.svg';
import githubLogo from './Github.svg';
import googleLogo from './Google.svg';
import twitterLogo from './Twitter.svg';

import './Form.css';

export function Form({ buttonText }) {
  return (
    <form className='form'>
      <input
        className='form__email-input'
        type='email'
        placeholder='&#xe158; Email'
      />
      <input
        className='form__password-input'
        type='password'
        placeholder='&#xe897; Password'
      />
      <button className='form__button' type='submit'>
        {buttonText}
      </button>
      <div className='form__alternatives'>
        <div className='alternatives__header'>
          or continue with these social profile
        </div>
        <div className='alternatives__items'>
          <img src={googleLogo} alt='Google logo' />
          <img src={facebookLogo} alt='Facebook logo' />
          <img src={twitterLogo} alt='Twitter logo' />
          <img src={githubLogo} alt='Github logo' />
        </div>
      </div>
    </form>
  );
}
