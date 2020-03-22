import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        createNewBlog({ title, url, author })
    }

    return (
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
    )
}

export default BlogForm