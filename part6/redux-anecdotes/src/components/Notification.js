import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  useEffect(() => {
    const timer = setTimeout(() => dispatch(clearNotification()), 5000)
    return () => clearTimeout(timer)
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      You voted for: {notification}
    </div>
  )
}

export default Notification
