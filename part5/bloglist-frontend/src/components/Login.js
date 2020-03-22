import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import createNotification from '../util/createNotification'

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginMessage, setLoginMessage] = useState(null)

    const handleLogin = async event => {
        event.preventDefault()
        try {
          const user = await loginService.login({ username, password })
          window.localStorage.setItem('user', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
        } catch (err) {
          createNotification(setLoginMessage)(err.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <Notification message = {loginMessage}/>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )

}

export default Login