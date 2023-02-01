import React, { useState, useEffect } from "react";
import { updateProfile } from "../api";

// TODO - Handle the success and error messages correctly. Login before access?
// TODO - Add and edit the extra styling to the form, success messages, and the error messages from semantic UI in other branch.
// TODO - Implement the button/link here to go to order history page.

// REVIEW - Look into "Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component."

const Account = ({ token, user, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailAddress, setEmailAddress] = useState(user.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setSuccess("Account updated successfully!");
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
          {/* <h4 className='ui dividing header'>User Info</h4> */}
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
              value={phoneNumber}
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
            <div className='ui bottom attached success message'>{success}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;