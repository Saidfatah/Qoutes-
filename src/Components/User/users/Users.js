import React from 'react'
import { connect } from 'react-redux'

export const Users = ({searched_users,recommendation}) => {
    return (
        <div>
            
        </div>
    )
}

export default connect(
     state=>({
        recommendation:state.users.recommendation,

     }),
     null
)(Users)
