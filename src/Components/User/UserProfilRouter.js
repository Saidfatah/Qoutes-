import React  from 'react'
import { connect } from 'react-redux'
import UserProfile from './UserProfile'

//this component baisically if user to be fetched is the current logged user or not 
//by comparing id it recieves from router params to auth.user.id

export const UserProfilRouter = ({id,user}) => {
    return (
        <div>
            {/* {user && <UserProfile id={user.id} /> } */}
            <UserProfile id={id}  user={user} />
        </div>
    )
}



export default connect(
     (state)=>({
      user : state.auth.user
     }),
     null
)(UserProfilRouter)
