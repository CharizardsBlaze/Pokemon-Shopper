import React, { useState, useEffect } from "react";
import { updateProfile } from "../api";

const Account = ({ token, user, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailAddress, setEmailAddress] = useState(user.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmailAddress(user.emailAddress);
    setPhoneNumber(user.phoneNumber);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateProfile(
      {
        username,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
      },
      token
    );

    if (updatedUser.error) {
      setError(updatedUser.error);
      setSuccess("");
    } else {
      setUser(updatedUser);
      setError("");
      setSuccess(true);
    }
  };

  return (
    <div className='ui text container'>
      <div className='ui segment'>
        <h1 className='ui dividing header'>Account Info</h1>
        <form className='ui form' onSubmit={handleSubmit}>
          <div className='two fields'>
            <div className='field'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='required field'>
            <label htmlFor='emailAddress'>Email Address</label>
            <input
              type='text'
              name='emailAddress'
              id='emailAddress'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              type='text'
              name='phoneNumber'
              id='phoneNumber'
              value={phoneNumber || ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button className='ui primary submit button' type='submit'>
            Update
          </button>
          {error && (
            <div className='ui bottom attached error message'>{error}</div>
          )}
          {success && (
            <div className='ui center aligned inverted green segment'>
              "Account updated successfully!"
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;
