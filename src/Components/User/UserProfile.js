import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import UserInfo from '../Common/user/UserInfo'
import UserImage from '../Common/user/UserImage'
import UserImageUploader from './UserImageUploader'
import UpdateUserProfile from './UpdateUserProfile'

//check if this is the logged users profil 
//check if this user is blocked by logged user or blocked the logged user 
export const UserProfile = ({user,id,visited_user,recommendation,editUserProfile,upLoadProfileImage,follow,accessible,visitProfile,toggleFollow,block}) => {
    useEffect(() => {
        //only fetch user data whene we"re cistng a none currently logged user 
        if(!user)  visitProfile(id)
        console.log({image})
    }, [])

    if(!user && visited_user === null) return <div>loading user info </div>

    const {full_name,user_name,email,country,birth_date,bio,image,followers,following,likes,quotes}=!user ? visited_user :user
    return (
        <div>
           <UserInfo {...{full_name,user_name}} />
           <UserImage {...{image}} />

            <UserImageUploader {...{upLoadProfileImage}} />
            <UpdateUserProfile {...{editUserProfile}} />
            
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
        visited_user   : state.users.visited_user ,
        recommendation : state.users.recommendation ,
        follow         : state.users.follow ,
        accessible     : state.users.accessible ,
    })
    , 
    dispatch => ({
        visitProfile   : dispatch.users.visitProfile,
        toggleFollow   : dispatch.users.toggleFollow , 
        block          : dispatch.users.block , 
        upLoadProfileImage : dispatch.users.upLoadProfileImage,
        editUserProfile    : dispatch.users.editUserProfile   
    })
)(UserProfile)
