import React from 'react'
import { connect } from 'react-redux'
import {Link } from "react-router-dom";

export const Sidebar = ({user,IsAuthenticated,logout}) => {
  
    if(!user)return null


    return (
        <div>
             <h3>sideb bar</h3>
             <Link to="/">Home</Link>
             <Link to={"/profile/"+user.doc_id} >Profile</Link>
             <p> {IsAuthenticated ? user.full_name :"no user logged" }</p>
             {
                 IsAuthenticated 
                 ?<button onClick={logout}>logout</button>
                 :null
             }
        </div>
    )
}


export default connect(
    state=>({
        user: state.auth.user,
        IsAuthenticated : state.auth.IsAuthenticated, 
    }), 
    dispatch=>({
        logout: dispatch.auth.logout,
    }))
(Sidebar)