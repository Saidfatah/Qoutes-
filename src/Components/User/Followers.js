import React  from 'react'
import { connect } from 'react-redux'
import UserBall from './UserBall'
import {Flex} from '../Common/containers/styled'


//implement infinite scrool here too 
export const Followers = ({followers}) => {
    if(!followers.length) return <p>you have no followers</p>
    return (
     <Flex dir="column">
        {followers.map(user=><UserBall briefUserInfo={user} />)}
     </Flex>
    )
}



export default connect(
     state=>({
        followers:state.users.followers
     }),
     null
)
(Followers)
