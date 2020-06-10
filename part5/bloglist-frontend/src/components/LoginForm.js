import React, { useState } from 'react'

const LoginForm = ({ setLoginMessages, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = ({ target }) => {
    const setters = {
      username: setUsername,
      password: setPassword
    }
    setters[target.name](target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      await login({ username, password })
    } catch (err) {
      setLoginMessages([err.message])
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:
          <input
            id = "username"
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Password:
          <input
            id = "password"
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm