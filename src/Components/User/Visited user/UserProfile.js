import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../Common/user/UserInfo'
import UserImage from '../../Common/user/UserImage'


export const UserProfile = ({user,id,visited_user,visitProfile,toggleFollow,block}) => {

    useEffect(() => {
         visitProfile(id)
    }, [])

    if( visited_user === null) return <div>loading user info </div>

    const {full_name,user_name,email,country,birth_date,bio,image,blocked,followers,following,likes,quotes}=visited_user 

    if( blocked.filter(u=>u.id == user.id )[0] != undefined   || user.blocked.filter(u=>u.id == id )[0] != undefined  ) return <div>You can't see this content </div>
 
    console.log(user)
    const followed=  user && user.following.filter(u=>u.id == id)[0] != undefined 

    return (
        <div>
            <UserInfo {...{full_name,user_name}} />
            <UserImage {...{image}} />

            <button 
                  onClick={e=>toggleFollow({
                      user   : {id,full_name,user_name,image},
                      follow : followed
                  })}>  
                  {
                  followed
                  ? "unFollow"
                  : "follow"
                  }  
            </button>

            <button 
                  onClick={e=>block({id,full_name,user_name,image})}>   
                  block
            </button>
        </div>
    )
}



export default connect(
    state => ({
        user           : state.auth.user ,
        visited_user   : state.users.visited_user ,
    })
    , 
    dispatch => ({
        visitProfile   : dispatch.users.visitProfile,
        toggleFollow   : dispatch.users.toggleFollow , 
        block          : dispatch.users.block , 
    })
)(UserProfile)
