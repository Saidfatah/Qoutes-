import React from 'react'

//this means wether the qoute post is a shared notifcation post or like notification post (similar to twitter feed)
//here we will check if any of the saved followed users ids are in 
//liked_array
//sahred_by array 
//if not then its either on of their posts in which case we do nothing 
//or the current logged users post in which  case we also do nothing 

//so the shared liked thng wll only be applied to qoutes of users that are not followed by current user 
const QoutePostType=({quote_publisher,user,profileQuote,shared_by,liked_by,followed})=> {

    if(!followed) return null

    const followedIds= followed.map(user=>user.id)
    let userId= null; 

    let isShared = shared_by.filter(id => {
        if(followedIds.includes(id)){
           userId=id;
           return true 
        }
        return false 
    })[0] != undefined
    
    let isLiked = liked_by.filter(id => {
        if(followedIds.includes(id)){
           userId=id;
           return true 
        }
        return false 
    })[0] != undefined

    if(isShared)
          return <p>{followed.filter(user=>user.id == userId)[0].user_name} shared</p>
    
    if(isLiked)
          return <p>{followed.filter(user=>user.id == userId)[0].user_name} liked </p>
    

    return null
}

export default QoutePostType
