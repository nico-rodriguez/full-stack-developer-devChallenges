import './EditForm.css';

const EditForm = () => {
  return (
    <form className='profile-edit-form'>
      <div className='profile-edit-form__item'>
        <input
          type='file'
          className='profile-edit-form__image-input'
          id='image-input'
        />
        <label htmlFor='image-input' id='image-input-label'>
          <img
            src='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=72&q=72'
            alt=''
            width={72}
            height={72}
          />
        </label>
        <p id='image-input-text'>CHANGE PHOTO</p>
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          placeholder='Enter your name...'
          name='name'
          id='name'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='bio'>Bio</label>
        <textarea
          type='text'
          placeholder='Enter your bio...'
          rows={3}
          name='bio'
          id='bio'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='phone'>Phone</label>
        <input
          type='text'
          placeholder='Enter your phone...'
          name='phone'
          id='phone'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          placeholder='Enter your email...'
          name='email'
          id='email'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Enter your password...'
          name='password'
          id='password'
        />
      </div>
      <button className='profile-edit-form__submit-button' type='submit'>
        Save
      </button>
    </form>
  );
};

export default EditForm;
