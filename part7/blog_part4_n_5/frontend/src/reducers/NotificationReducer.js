const NotificationReducer = (state = null, action) =>{
  switch(action.type){
    case 'show':
      return {type: action.data.messageType, message: action.data.message}
    case 'hide': 
      return null
    default:
      return state
  }
}


export const setNotification = (message, messageType='info', displayTime = 2) => {
  return async dispatch => {
    dispatch({
      type: 'show',
      data: {
        messageType: messageType,
        message: message
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'hide',
        data:null
      })
    }, displayTime * 1000)
  }
}
export default NotificationReducer