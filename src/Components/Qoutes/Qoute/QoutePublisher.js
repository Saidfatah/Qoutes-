import React from 'react'
import UserImage from '../../Common/user/UserImage'
const QoutePublisher = ({quote_publisher}) => {
    const {image,user_name,full_name}=quote_publisher
    return (
        <div>
            <UserImage image={image} />
            <p>{full_name} <span>{user_name}</span> </p>
        </div>
    )
}

export default QoutePublisher
