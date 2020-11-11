import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import UserInfo from '../Common/user/UserInfo'
import UserImage from '../Common/user/UserImage'

export const UserProfile = ({id,visited_user,recommendation,follow,accessible,visitProfile,toggleFollow,block}) => {
    const {full_name,user_name,email,country,birth_date,bio,image,followers,blocked,following,likes,quotes}=visited_user

    useEffect(() => {
        visitProfile(id)
    }, [])

    return (
        <div>
           <UserInfo {...{full_name,user_name}} />
           <UserImage {...{image}} />
            <button onClick={e=>toggleFollow(id)}> 
                {follow?"unFollow":"follow"}
            </button>
            <button onClick={e=>block(id)}> 
                {accessible?"unBlock":"block"}
            </button>
        </div>
    )
}



export default connect(
    state => ({
        visited_user  : state.users.visited_user ,
        recommendation : state.users.recommendation ,
        follow : state.users.follow ,
        accessible : state.users.accessible ,
    })
    , 
    dispatch => ({
        visitProfile   : dispatch.users.visited_user,
        toggleFollow : dispatch.users.toggleFollow , 
        block    : dispatch.users.block , 
    })
)(UserProfile)
