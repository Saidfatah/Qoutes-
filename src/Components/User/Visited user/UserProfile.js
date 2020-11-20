import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../Common/user/UserInfo'
import UserImage from '../../Common/user/UserImage'


//check if this is the logged users profil 
//check if this user is blocked by logged user or blocked the logged user 
export const UserProfile = ({user,id,visited_user,recommendation,follow,accessible,visitProfile,toggleFollow,block}) => {

    useEffect(() => {
         visitProfile(id)
        console.log({image})
    }, [])

    if( visited_user === null) return <div>loading user info </div>

    const {full_name,user_name,email,country,birth_date,bio,image,blocked,followers,following,likes,quotes}=visited_user 
    console.log({blocked})
    if(blocked.indexOf(user.id)>-1  || user.blocked.indexOf(id)>-1  ) return <div>You can't see this content </div>


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
        user           : state.auth.user ,
        visited_user   : state.users.visited_user ,
        recommendation : state.users.recommendation ,
        follow         : state.users.follow ,
    })
    , 
    dispatch => ({
        visitProfile   : dispatch.users.visitProfile,
        toggleFollow   : dispatch.users.toggleFollow , 
        block          : dispatch.users.block , 
    })
)(UserProfile)
