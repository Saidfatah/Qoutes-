import React  from 'react'
import { connect } from 'react-redux'
import UserBall from '../UserBall'
import {Flex} from '../Common/containers/styled'

//implement infinite scrool here too 
export const Followed = ({followed}) => {
    if(!followed.length) return <p>you are not following anybody yet</p>

    return (
        <Flex dir="column">
             {followed.map(user=><UserBall briefUserInfo={user} />)}
        </Flex>
    )
}



export default connect(
     state=>({
        followed:state.users.followed
     }), null
)(Followed)
