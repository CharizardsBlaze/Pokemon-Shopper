import { useState } from 'react'
import { loginUser } from '../api'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        const newUser = await loginUser(email, password)
        setPassword('');
        setEmail('');
    }
    return (
        <form className='user-forms' onSubmit={handleLoginSubmit}>
            <label>Email:</label>
            <input className='text-input' type='text' value={email} onChange={event => setEmail(event.target.value)}></input>
            <label>Password:</label>
            <input className='text-input' type='password' value={password} onChange={event => setPassword(event.target.value)}></input>
            <button id='login-button' className='form-button' type='submit'>Login</button>
        </form>
    )
}
export default Login;