const baseUrl = '/api/login'

const login = async credentials => {
  const res = await fetch(baseUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error)
  }
  return data
}

export default { login }