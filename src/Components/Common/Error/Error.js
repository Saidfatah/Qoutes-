import React from 'react'

const  Error=({message,trigger}) =>{
    if(!trigger) return null
    return<div>{message} </div> 
}

export default Error
