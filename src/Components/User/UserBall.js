import React from 'react'
import UserImage from '../Common/user/UserImage'
import UserInfo from '../Common/user/UserInfo'
import {Flex} from '../Common/containers/styled'

const UserBall=({briefUserInfo})=> {
    const {image,full_name,user_name}= briefUserInfo

    if( !image && !full_name && !user_name) return null
    
    return (
        <Flex  >
            <UserImage {...{image}} />
            <UserInfo {...{full_name,user_name}}  />
        </Flex>
    )
}

export default UserBall
