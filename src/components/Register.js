import {useState} from 'react'
import { registerUser } from '../api'
const Register = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        const newUser = await registerUser(username, firstName, lastName, registerPassword, registerEmail, phoneNumber)
        console.log(newUser)
        setUsername('');
        setFirstName('');
        setLastName('');
        setRegisterPassword('');
        setRegisterEmail('');
        setPhoneNumber('');
    }
    return (
        <form className='user-forms' onSubmit={handleRegisterSubmit}>
            <label>Username:</label>
            <input className='text-input' type='text' value={username} onChange={event => setUsername(event.target.value)}></input>
            <label>First Name:</label>
            <input className='text-input' type='text' value={firstName} onChange={event => setFirstName(event.target.value)}></input>
            <label>Last Name:</label>
            <input className='text-input' type='text' value={lastName} onChange={event => setLastName(event.target.value)}></input>
            <label>Password:</label>
            <input className='text-input' type='password' value={registerPassword} onChange={event => setRegisterPassword(event.target.value)}></input>
            <label>Email:</label>
            <input className='text-input' type='text' value={registerEmail} onChange={event => setRegisterEmail(event.target.value)}></input>
            <label>Phone Number:</label>
            <input className='text-input' type='text' value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}></input>
            <button id='register-button' className='form-button' type='submit'>Register</button>
        </form>
    )
}
export default Register;