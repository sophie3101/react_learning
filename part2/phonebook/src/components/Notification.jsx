import React from "react"

const successStyle = {
    color: "green",
    fontWeight: 'bold',
    fontSize : 20,
    border: '1px solid green',
    backgroundColor: 'lightgrey'

}
const errorStyle = {
    color: "red",
    fontWeight: 'bold',
    fontSize : 20,
    border: '1px solid green',
    backgroundColor: 'lightgrey'

}
const Notification = ({message, classStyle}) =>{ 
    if (message !== ''){
        if (classStyle.includes('success')){
            return (
                <div className={classStyle} style={successStyle}>
                    <span>{message}</span>
                </div>
            )
        }else{
            return (
                <div className={classStyle} style={errorStyle}>
                    <span>{message}</span>
                </div>
            )
        }
        
    }
    return
    
}
export default Notification