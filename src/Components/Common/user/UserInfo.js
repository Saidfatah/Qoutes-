import React from 'react'
import {UserName,FullName} from './styled'

const UserInfo= ({full_name,user_name})=> {
    
    if(full_name ==="no_full_name" && user_name ==="no_user_name" ) return null
    
    if(full_name ==="no_full_name" ) return <UserName>{user_name}</UserName>

    if( user_name ==="no_user_name" ) return  <FullName>{full_name}</FullName>

    return (
        <div>
           <UserName>{user_name}</UserName>
           <FullName>{full_name}</FullName>
        </div>
    )
}

export default UserInfo
