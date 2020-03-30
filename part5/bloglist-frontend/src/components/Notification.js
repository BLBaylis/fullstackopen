import React, { useEffect } from 'react'

const Notification = ({ resetNotification, messages }) => {
  useEffect(() => resetNotification(messages))

  if (!messages) {
    return null
  }
  return messages.length === 1 ? <p>{messages[0]}</p> : <ul>{messages.map(message => <li key = {message}>{message}</li>)}</ul>
}

export default Notification