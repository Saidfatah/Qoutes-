import React from 'react'
import { connect } from 'react-redux'

export const Sidebar = ({user,IsAuthenticated,logout}) => {
    return (
        <div>
             <h3>sideb bar</h3>
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