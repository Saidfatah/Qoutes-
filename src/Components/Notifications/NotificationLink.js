import React from 'react'
import UserBall from '../User/UserBall'
import {Link} from 'react-router-dom'
import {CreatedAt} from '../Common/Styled Components/Text'

const NotificationLink=({notification,checkNotification})=> { 
    const {topic, redirect, checked, sender, created_at} = notification
    const {image,user_name,id} = sender

    return (
        <Link to={redirect} style={{backgroundColor:checked ?"#e3e3e3":"555" }}>
            <UserBall briefUserInfo={{ image , full_name:"no_full_name" , user_name:"no_user_name" , id}} />
            {topic}
            <CreatedAt>{created_at}</CreatedAt>
        </Link>
    )
}

export default NotificationLink
