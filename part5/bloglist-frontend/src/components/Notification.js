import React from 'react'

const Notification = ({ message, messages }) => {
    if (!message && !messages) {
        return null;
    }

    if (messages) {
        if (message) {
            messages = [message, ...messages]
        }
        return (
            <ul>
                {messages.map(message => <li key = {message}>{message}</li>)}
            </ul>
        )
    }

    return <p>{message}</p>
}

export default Notification