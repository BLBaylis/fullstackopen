// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => blogs.map(blog => blog.likes).reduce((totalLikes, likes) => totalLikes + likes, 0)

const favouriteBlog = blogs => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.filter(blog => blog.likes === mostLikes)[0] || null
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const authorMap = new Map()
  blogs.forEach(({ author }) => {
    const authorCount = authorMap.get(author)
    const newValue = authorCount !== undefined ? authorCount + 1 : 1
    authorMap.set(author, newValue)
  })
  const allAuthors = Array.from(authorMap.keys())
  const maxBlogs = Math.max(...allAuthors.map(author => authorMap.get(author)))
  const mostBlogsAuthor = allAuthors.filter(author => authorMap.get(author) === maxBlogs)[0]
  return {
    author : mostBlogsAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const authorMap = new Map()
  blogs.forEach(({ author, likes }) => {
    const authorCount = authorMap.get(author)
    const newValue = authorCount !== undefined ? authorCount + likes : likes
    authorMap.set(author, newValue)
  })
  const allAuthors = Array.from(authorMap.keys())
  const maxLikes = Math.max(...allAuthors.map(author => authorMap.get(author)))
  const mostBlogsAuthor = allAuthors.filter(author => authorMap.get(author) === maxLikes)[0]
  return {
    author : mostBlogsAuthor,
    likes: maxLikes
  }
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}