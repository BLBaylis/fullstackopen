import React, { useState } from 'react'

const BlogForm = ({ addBlog, setBlogMessages }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleChange = ({ target }) => {
    const setters = {
      title: setTitle,
      author: setAuthor,
      url: setUrl
    }
    setters[target.name](target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      setTitle('')
      setAuthor('')
      setUrl('')
      await addBlog({ title, author, url })
      setBlogMessages([`${title} by ${author} successfully added`])
    } catch (err) {
      setBlogMessages(err.errors)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
                Title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
                Author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
                Url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default BlogForm