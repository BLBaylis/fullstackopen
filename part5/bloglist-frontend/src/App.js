import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import createNotification from './util/createNotification'

const App = () => {
  const [displayLogin, setDisplayLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setUsername('')
    setPassword('')
    setDisplayLogin(false)
  }

  if (!user) {
    return (
      <LoginForm
        username = {username}
        setUsername = {setUsername} 
        password = {password}
        setPassword = {setPassword} 
        loginMessage = {loginMessage}
        displayLogin = {displayLogin}
        setDisplayLogin = {setDisplayLogin}
        handleLogin = {handleLogin}
      />
    )
  }

  return (
    <div>
      {user && (
        <>
          <p>Logged in as {user.username}</p>
          <button onClick = {logout}>Log out</button>
          <h1>Blogs</h1>
          <BlogForm blogs = {blogs} setBlogs = {setBlogs}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
    </div>
  )
}

export default App