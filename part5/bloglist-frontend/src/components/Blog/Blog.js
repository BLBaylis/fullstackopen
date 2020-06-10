import React from 'react'
import Toggleable from '../Toggleable'

const noMargin = {
  margin : 0
}

const Blog = ({ blog, deleteBlog, incrementBlogLikes }) => {
  const { id, title, author, url, likes, user } = blog

  const addLike = async () => {
    await incrementBlogLikes({ ...blog, likes: likes + 1 })
  }

  const removeBlog = () => {
    if (window.confirm(`Are you sure you would like to delete ${title} by ${author}?`)) {
      deleteBlog(id)
    }
  }

  return (
    <div data-cy = "blog" style = {{ border : 'solid 1px #000', padding: '1rem', margin: '1rem' }}>
      <h3>{title} by {author}</h3>
      <Toggleable labelWhenOpened = "Close" labelWhenClosed = "Show details">
        <div className = "toggleable-content" style = {{ paddingBottom: '1rem' }}>
          <p style = {noMargin}>{url}</p>
          <div style = {noMargin}>
            <p style = {{ display: 'inline-block', ...noMargin, marginRight: '10px' }} data-cy = "likes-counter">Likes: {likes}</p>
            <button onClick = {addLike} data-cy = "like-button">Like</button>
          </div>
          <p style = {noMargin}>Posted by: {user.username}</p>
          <button onClick = {removeBlog}>Remove</button>
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog
