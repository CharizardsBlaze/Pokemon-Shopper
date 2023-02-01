import {useState} from 'react'
import { registerUser } from '../api'
import { useNavigate } from 'react-router-dom'
const Register = ({setToken, setUser}) => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [returnFromRegister, setReturnFromRegister] = useState({})
    const navigate = useNavigate()
    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        const newUser = await registerUser(username, firstName, lastName, registerPassword, registerEmail, phoneNumber)
        if(newUser.error){
            setReturnFromRegister(newUser)
            if(newUser.error === "EmailTaken"){
                setRegisterEmail('')
            } else if(newUser.error === "UsernameTaken"){
                setUsername('')
            }
            return
        }
        setUsername('');
        setFirstName('');
        setLastName('');
        setRegisterPassword('');
        setRegisterEmail('');
        setPhoneNumber('');
        setToken(newUser.token)
        localStorage.setItem('pokemon-shopper-token', newUser.token)
        navigate('/')
    }
    return (
        <div className="register">                     
            <form className='user-forms' onSubmit={handleRegisterSubmit}>
                {returnFromRegister.message ? <p>{returnFromRegister.message}</p> : null}
                <label className='label'>Username:</label>
                <input className='text-input' type='text' value={username} onChange={event => setUsername(event.target.value)}></input>
                <label className='label'>First Name:</label>
                <input className='text-input' type='text' value={firstName} onChange={event => setFirstName(event.target.value)}></input>
                <label className='label'>Last Name:</label>
                <input className='text-input' type='text' value={lastName} onChange={event => setLastName(event.target.value)}></input>
                <label className='label'>Password:</label>
                <input className='text-input' type='password' required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number, one uppercase, one lowercase, and 8 or more characters" 
                value={registerPassword} onChange={event => setRegisterPassword(event.target.value)}></input>
                <label className='label'>Email:</label>
                <input className='text-input' type='text' value={registerEmail} onChange={event => setRegisterEmail(event.target.value)}></input>
                <label className='label'>Phone Number:</label>
                <input className='text-input' type='text' value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}></input>
                <button id='register-button' className='ui button' type='submit'>Register</button>
            </form>
        </div>
    )
}
export default Register;