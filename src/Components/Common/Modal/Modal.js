import React from 'react'

const  Modal=({display,setdisplay,children})=> {
    if(!display) return null


    return (
        <div>
            <button onClick={e=>setdisplay(false)} >close modal</button>
           {children}
        </div>
    )
}

export default Modal
