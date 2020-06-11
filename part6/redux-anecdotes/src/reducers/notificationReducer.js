export const updateNotification = content => ({
  type: 'UPDATE_NOTIFICATION',
  content
})

export const clearNotification = content => ({
  type: 'CLEAR_NOTIFICATION',
  content
})

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state;
    }
}

export default reducer