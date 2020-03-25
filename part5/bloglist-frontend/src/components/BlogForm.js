import React, { useState } from 'react'
import Notification from  '../components/Notification'
import blogService from '../services/blogs'
import createNotification from '../util/createNotification'

const BlogForm = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [blogMessages, setBlogMessages] = useState(null)

    const handleSubmit = async event => {
        event.preventDefault()
        const createBlogNotification = createNotification(setBlogMessages)
        try {
          const newBlog = await blogService.newBlog({ title, author, url })
          setBlogs(blogs.concat(newBlog))
          createBlogNotification([`${title} by ${author} successfully added`])
        } catch (err) {
          createBlogNotification(err.errors)
        }
    }

    return (
        <>
            <Notification messages = {blogMessages}/>
            <form onSubmit={handleSubmit}>
                <div>
                    Title: 
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author: 
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url: 
                    <input
                        type="text"
                        value={url}
                        name="author"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default BlogForm