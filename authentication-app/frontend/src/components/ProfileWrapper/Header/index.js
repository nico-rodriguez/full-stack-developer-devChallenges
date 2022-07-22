import './Header.css';
import logo from 'assets/images/devchallenges.svg';

export default function Header() {
  return (
    <header className='profile-header'>
      <img
        src={logo}
        alt='devchallenges logo'
        className='profile-header__logo'
      />
      <div tabIndex={0} className='profile-header__user-info'>
        <img
          src='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=32&q=32'
          width={32}
          height={32}
          alt=''
          className='profile-header__user-image'
        />
        <p className='profile-header__user-name'>Xanthe Neal</p>
        <ul className='profile-header__dropdown'>
          <li>My Profile</li>
          <li>Group Chat</li>
          <li></li>
          <li>
            <a href='http://localhost:5000/api/v1/logout'>Logout</a>
            {/* <a href='http://google.com'>Google</a> */}
          </li>
        </ul>
      </div>
    </header>
  );
}
