import { useState } from 'react';
import userService from 'services/user';
import './EditForm.css';

const EditForm = () => {
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());

  const getInputValues = (objInputs) =>
    Object.entries(objInputs).reduce(
      (objValues, [key, input]) =>
        Object.assign(objValues, { [key]: input.value }),
      {}
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, bio, phone, email, password } = event.target;
    const [photo] = event.target.photo.files;

    URL.revokeObjectURL(userPhoto);

    const editFields = {
      photo,
      ...getInputValues({
        name,
        bio,
        phone,
        email,
        password,
      }),
    };
    const user = await userService.editProfile(editFields);
    userService.saveUserPhoto(user.photo);
    userService.saveUserName(user.name);
  };

  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>
      <div className='profile-edit-form__item'>
        <input
          type='file'
          className='profile-edit-form__photo-input'
          id='photo-input'
          name='photo'
          onChange={(event) => {
            // Create a URL for temporary displaying the photo
            setUserPhoto(URL.createObjectURL(event.target.files[0]));
          }}
        />
        <label htmlFor='photo-input' id='photo-input-label'>
          <img src={userPhoto} alt='' width={72} height={72} />
        </label>
        <p id='photo-input-text'>CHANGE PHOTO</p>
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
