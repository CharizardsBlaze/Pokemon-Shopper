import { useState } from 'react'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <form>
            <label>Email:</label>
            <input className='text-input' type='text' value={email} onChange={event => setEmail(event.target.value)}></input>
            <label>Password:</label>
            <input className='text-input' type='password' value={password} onChange={event => setPassword(event.target.value)}></input>
            <button id='login-button' className='form-button' type='submit'>Login</button>
        </form>
    )
}
