import React  from 'react'
import { connect } from 'react-redux'

export const Toast = ({toast}) => {
    return (
        <div>
            {toast.map((t,i)=><li key={i}>{t.message}</li>)}
        </div>
    )
}



export default connect(
    state=>({toast:state.toast}), 
    null)
(Toast)
