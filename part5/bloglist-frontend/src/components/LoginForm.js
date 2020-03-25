import React from 'react'
import Notification from './Notification'

const LoginForm = ({ username, setUsername, password, setPassword, loginMessage, handleLogin, displayLogin, setDisplayLogin }) => {

    if (!displayLogin) {
        return <button onClick = {() => setDisplayLogin(true)}>Log in</button>
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
                <button type="submit">Submit</button>
                <button onClick = {() => setDisplayLogin(false)}>Cancel</button>
            </form>
        </div>
    )

}

export default LoginForm