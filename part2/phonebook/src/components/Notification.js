import React from 'react'

const notificationStyles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div style = {notificationStyles}>
        {message}
      </div>
    )
  }

export default Notification