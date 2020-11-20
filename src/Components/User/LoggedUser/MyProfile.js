import React,{useState} from 'react'
import UserImageUploader from './UserImageUploader'
import UpdateUserProfile from './UpdateUserProfile'
import UsersRecommended from '../users/UsersRecommended'
import UserInfo from '../../Common/user/UserInfo'
import UserImage from '../../Common/user/UserImage'
import UserSearch  from '../users/search/UserSearch'
import {connect} from 'react-redux'

const MyProfile=({user,upLoadProfileImage,editUserProfile})=> {
    const [imageUploadModalDislay, setimageUploadModalDislay] = useState(false)
    const [ProfileUpdateModalDisplay, setProfileUpdateModalDisplay] = useState(false)


    const {full_name,user_name,email,country,birth_date,bio,image,followers,following,likes,quotes}=user 

    return (
        <div>
            my profile
            <UserSearch />
            <UserInfo {...{full_name,user_name}} />
            <UserImage {...{image}} />

            <button onClick={e=>setimageUploadModalDislay(true)} >update image </button>
            <button onClick={e=>setProfileUpdateModalDisplay(true)} >update profile info </button>
            <UserImageUploader {...{user,upLoadProfileImage,imageUploadModalDislay, setimageUploadModalDislay}} />
            <UpdateUserProfile {...{user,editUserProfile,ProfileUpdateModalDisplay, setProfileUpdateModalDisplay}} />
            <UsersRecommended />
        </div>
    )
}


export default connect(
     null,
     dispatch => ({
         upLoadProfileImage : dispatch.users.upLoadProfileImage,
         editUserProfile    : dispatch.users.editUserProfile   
     })
)(MyProfile)


