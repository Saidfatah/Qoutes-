import React from 'react'
import ReactModal from 'react-modal'
import colors from '../Styled Components/colors'


const  Modal=({display,setdisplay,title,children})=> {
    if(!display) return null
  
    const afterOpenModal=()=> {
      
    }
    
    const closeModal=()=>{
      setdisplay(false);
    }

    return (
        <ReactModal
          isOpen={display}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              overflow              : 'visible',
              width                 : '50%' ,
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            },
            overlay :{
              backgroundColor: colors.modalBackground,
            }
          }}
          contentLabel={title}
        >
            {children}
        </ReactModal>
    )
}

export default Modal
