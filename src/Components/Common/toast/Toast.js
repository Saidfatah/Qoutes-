import React  from 'react'
import { connect } from 'react-redux'
import {FlashMessage,Tag} from '../Styled Components/Container'
import colors from '../Styled Components/colors'

export const Toast = ({toast}) => {
    return (
        <FlashMessage display={toast.length?"flex":"none"}>
            <Tag bgColor={colors.flashMessageBackground} color={colors.flashMessage}>
                 {toast.map((t,i)=><li key={i}>{t.message}</li>)}
            </Tag>
        </FlashMessage>
    )
}



export default connect(
    state=>({toast:state.toast}), 
    null)
(Toast)
