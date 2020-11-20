import React from 'react'
import UserImage from '../Common/user/UserImage'
import UserInfo from '../Common/user/UserInfo'
import {Flex} from '../Common/Styled Components/Container'
import {Link} from 'react-router-dom'
const UserBall=({briefUserInfo})=> {
    const {image,full_name,user_name,id}= briefUserInfo

    if( !image && !full_name && !user_name) return null
    
    return (
        <Link to={"/profile/"+id}  >
             <Flex  >
                 <UserImage {...{image}} />
                 <UserInfo {...{full_name,user_name}}  />
             </Flex>
        </Link>
    )
}

export default UserBall
