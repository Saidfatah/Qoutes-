import React from 'react'
import {Frame,Gradiant} from '../Common/Styled Components/Container'
const GradiantBackground=({children})=> {
    return (
        <Frame width="100%" height="100%">
             <Gradiant>
                 {children}
             </Gradiant>
        </Frame>
    )
}

export default GradiantBackground
