import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const newBlog = async blogObj => {
  const res = await fetch(baseUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(blogObj)
  })
  const data = await res.json()
  if (!res.ok) {
    const err = new Error("Validation failed")
    err.errors = data.errors
    throw err
  }
  return data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, newBlog, setToken }