import React from 'react'
import {UserName,FullName} from './styled'
const UserInfo= ({full_name,user_name})=> {
    return (
        <div>
           <UserName>{user_name}</UserName>
           <FullName>{full_name}</FullName>
        </div>
    )
}

export default UserInfo
