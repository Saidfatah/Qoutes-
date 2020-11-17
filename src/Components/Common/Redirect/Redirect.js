import React from 'react'
import {Redirect as Re} from 'react-router-dom'
import { connect } from 'react-redux'

const Redirect=({IsAuthenticated})=> {
    if(!IsAuthenticated) return <Re to="/auth"/>
    return null
}

export default connect(   
    state=>({
    IsAuthenticated:state.auth.IsAuthenticated,
    }),
    null)
(Redirect)
