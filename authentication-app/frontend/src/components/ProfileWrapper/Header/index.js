import './Header.css';
import logo from 'assets/images/devchallenges.svg';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import { useEffect, useState } from 'react';

export default function Header() {
  const [userName, setUserName] = useState(() => userService.getUserName());
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());

  useEffect(() => {
    userService.getProfile().then(({ name, photo }) => {
      setUserName(name);
      setUserPhoto(photo);
    });
  }, []);

  return (
    <header className='profile-header'>
      <img
        src={logo}
        alt='devchallenges logo'
        className='profile-header__logo'
      />
      <div tabIndex={0} className='profile-header__user-info'>
        <img
          src={userPhoto}
          width={32}
          height={32}
          alt=''
          className='profile-header__user-image'
        />
        <p className='profile-header__user-name'>{userName}</p>
        <ul className='profile-header__dropdown'>
          <li>
            <Link to='/profile'>My Profile</Link>
          </li>
          <li>
            <Link to='#'>Group Chat</Link>
          </li>
          <li></li>
          <li>
            <a href='http://localhost:5000/api/v1/logout'>Logout</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
