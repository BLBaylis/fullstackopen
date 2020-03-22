import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import createNotification from './util/createNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogMessages, setBlogMessages] = useState(null)

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

  const createNewBlog = async blogObj => {
    const createBlogNotification = createNotification(setBlogMessages)
    try {
      const newBlog = await blogService.newBlog(blogObj)
      const { title, author } = newBlog
      setBlogs(blogs.concat(newBlog))
      createBlogNotification([`${title} by ${author} successfully added`])
    } catch (err) {
      createBlogNotification(err.errors)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  if (!user) {
    return <Login setUser = {setUser} />
  }

  return (
    <div>
      <h1>Blogs</h1>
      <p>Logged in as {user.username}</p>
      <button onClick = {logout}>Log out</button>
      <Notification messages = {blogMessages}/>
      <BlogForm createNewBlog = {createNewBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App