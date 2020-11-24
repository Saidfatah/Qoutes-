import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserBall from '../UserBall'
export const UsersRecommended = ({fecthRecommend,recommendation}) => {
   
   
   
    useEffect(() => {
        fecthRecommend()
    }, [])

    if(recommendation == null || !recommendation.length ) return <div>no users to recommend</div>

    return (
        <div>
            {
                recommendation.map(user=> <UserBall key={user.id} {...
                {
                    briefUserInfo:{
                    full_name:user.full_name,
                    id:user.id,
                    image:user.image  }
                }} />
                )
            }
        </div>
    )
}



export default connect(
    state=>({
        recommendation : state.users.recommendation
    })
    , 
    dispatch => ({
        fecthRecommend : dispatch.users.fecthRecommend
    })
)
(UsersRecommended)
