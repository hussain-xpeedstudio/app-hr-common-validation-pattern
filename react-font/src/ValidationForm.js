import React, { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

function ValidationForm() {
  const [user_id, setUserId] = useState('');
  const [user_email, setUserEmail] = useState('');
  const validator = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [profile_image, setProfileImage] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:8888/api/getValidationRules')
      .then((response) => {
        setApiData(response.data);
        const customMessages = {};
        for (const rule in response.data.validationMessages) {
          customMessages[rule] = response.data.validationMessages[rule];
        }
        validator.current = new SimpleReactValidator({ messages: customMessages });
      })
      .catch((error) => console.error('API Error:', error));
  }, []);
  const handleProfileImage = (e) => {
    const selectedFile = e.target.files[0];
    const profileImageRules = apiData.validationRules.profile_image || {};
    const allowedExtensions = (apiData.validationRules.profile_image.match(/mimes:([^|]+)/) || [])[1];
    console.log(allowedExtensions);
    const maxSize = profileImageRules.max ? profileImageRules.max * 1024 : Infinity; 
    const validationErrors = {};
    if (profileImageRules.required && !selectedFile) {
      validationErrors.profile_image = 'Profile image is required.';
    } else if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();  
      if (!allowedExtensions.includes(fileExtension)) {
        validationErrors.profile_image = 'Invalid file type for profile image. Only  '+ allowedExtensions.split(',') +'  files are allowed.';
      } else if (selectedFile.size > maxSize) {
        validationErrors.profile_image = 'File size exceeds the maximum limit.';
      }
    }
  
    setErrors({ ...errors, profile_image: validationErrors.profile_image });
  
    if (!validationErrors.profile_image) {
      setProfileImage(selectedFile);
    }
  };

  const handleChangeUser = (event) => {
    setUserId(event.target.value);
    validator.current.showMessageFor('user_id');
  };

  const handleChangeUserEmail = (event) => {
    setUserEmail(event.target.value);
    validator.current.showMessageFor('user_email');
  };

  const handleSave = () => {
    setUserId(user_id);
    setUserEmail(user_email);
    if (validator.current.allValid()) {
      alert('Thanks for submitting the form');
    } else {
      alert('Your form is not valid');
      validator.current.showMessageFor('user_email');
      validator.current.showMessageFor('user_id');
    }
  };

  return (
    <div className="container">
      <div className="col-md-6" style={{ marginTop: '50px', marginLeft: '20%' }}>
        <h1 style={{ textAlign: 'center' }}>DynamoValidation</h1>
        <div className="form form-row">
          <input
            autoComplete="off"
            className="form-control mb-3"
            name="user_id"
            type="text"
            value={user_id}
            onChange={handleChangeUser}
            placeholder="Enter user id"
          />
          <span style={{ color: 'red' }}>
            {validator.current && (
              validator.current.message('user_id', user_id, apiData.validationRules.user_id || {})
            )}
          </span>
          <input
            autoComplete="off"
            className="form-control mb-3"
            name="user_email"
            type="text"
            value={user_email}
            onChange={handleChangeUserEmail}
            placeholder="Enter user email"
          />
          <span style={{ color: 'red' }}>
            {validator.current && (
              validator.current.message('user_email', user_email, apiData.validationRules.user_email || {})
            )}
          </span>
          <input
            autoComplete="off"
            className="form-control mb-3"
            name="profile_image"
            type="file"
            onChange={handleProfileImage}
            placeholder="Upload profile Image"
          />
          <span style={{ color: 'red' }}>
            {errors.profile_image}
          </span>

          <div>UserId = {user_id}</div>
          <div>Email = {user_email}</div>
          <button onClick={handleSave} className="btn btn-primary form-control">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ValidationForm;
