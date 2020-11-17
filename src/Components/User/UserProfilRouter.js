import React  from 'react'
import {connect} from 'react-redux'
import MyProfile from './LoggedUser/MyProfile'
import UserProfile from './Visited user/UserProfile'
import {useParams} from "react-router-dom";

//this component baisically if user to be fetched is the current logged user or not 
//by comparing id it recieves from router params to auth.user.id
//because if its current logged user we woul'dnt need to fetch data from firebase
export const UserProfilRouter = ({user}) => {
    let { id } = useParams();
    return (
        <div>
            {
                id !== user.doc_id 
                ?<UserProfile id={id}  />
                :<MyProfile  user={user} />
            }
        </div>
    )
}



export default connect(
     (state)=>({
      user : state.auth.user
     }),
     null
)(UserProfilRouter)
