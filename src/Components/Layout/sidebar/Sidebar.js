import React from 'react'
import { connect } from 'react-redux'
import {Link } from "react-router-dom";
import colors from '../../Common/Styled Components/colors'
import {Background,Frame} from '../../Common/Styled Components/Container'


export const Sidebar = ({user,IsAuthenticated,logout}) => {
  
    if(!user)return null


    return (
        <Frame  width={"100%"}  height={"100%"} >
             <Background bgColor={colors.sideBarBackground} >
                 
                  <h3>sideb bar</h3>
                  <Link to="/">Home</Link>
                  <Link to={"/profile/"+user.doc_id} >Profile</Link>
                  <p> {IsAuthenticated ? user.full_name :"no user logged" }</p>
                  {
                      IsAuthenticated 
                      ?<Link to="/" onClick={logout}>logout</Link>
                      :null
                  }
             </Background>
        </Frame>
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