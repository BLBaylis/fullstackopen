import React, { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loginMessages, setLoginMessages] = useState(null)
  const [blogMessages, setBlogMessages] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(function sortBlogsByLikes(blogs) {
        return blogs.sort((a, b) => {
          if (a.likes === b.likes) {
            return 0
          }
          return a.likes <= b.likes ? 1 : -1
        })
      })
      .then(setBlogs)
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

  const resetNotification = setterFn => messages => {
    if (messages) {
      const reset = setTimeout(() => {
        setterFn(null)
      }, 5000)
      return () => {
        clearTimeout(reset)
        setterFn(null)
      }
    }
  }

  const login = async credentials => {
    const user = await loginService.login(credentials)
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const addBlog = async blogObj => {
    const newBlog = await blogService.newBlog(blogObj)
    setBlogs(blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async newBlogObj => {
    try {
      const updatedBlog = await blogService.updateBlog(newBlogObj)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (err) {
      console.log(err.error)
      console.error(err)
    }
  }

  const deleteBlog = async blogId => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (err) {
      console.error(err)
    }
  }

  if (!user) {
    return (
      <Toggleable
        labelWhenClosed = "Log In"
        labelWhenOpened = "Cancel"
      >
        <h1>Login</h1>
        <Notification resetNotification = {resetNotification(setLoginMessages)} messages = {loginMessages}/>
        <LoginForm
          login = {login}
          setLoginMessages = {setLoginMessages}
        />
      </Toggleable>
    )
  }

  return (
    <div>
      {user && (
        <>
          <p>Logged in as {user.username}</p>
          <button onClick = {logout}>Log out</button>
          <h1>Blogs</h1>
          <Toggleable
            ref = {blogFormRef}
            labelWhenClosed = "New Blog"
            labelWhenOpened = "Cancel"
          >
            <Notification resetNotification = {resetNotification(setBlogMessages)} messages = {blogMessages}/>
            <BlogForm
              addBlog = {addBlog}
              setBlogMessages = {setBlogMessages}
            />
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog = {deleteBlog} incrementBlogLikes = {updateBlog}/>
          )}
        </>
      )}
    </div>
  )
}

export default App