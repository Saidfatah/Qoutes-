import React,{useState} from 'react'
import Modal from '../../Common/Modal/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Flex} from '../../Common/Styled Components/Container'
import {Input,InputWrapper} from '../../Common/Styled Components/FormFields'
import {Submit} from '../../Common/Styled Components/Buttons'



const UpdateUserProfile=({user,editUserProfile,ProfileUpdateModalDisplay, setProfileUpdateModalDisplay})=> {
  
    const {full_name,country,birth_date,bio} = user 
    console.log({full_name,country,birth_date,bio} )
    const [userInfo, setuserInfo] = useState({...{full_name,country,birth_date,bio}})
    const [accumulatedUpdate, setaccumulatedUpdate] = useState({})
   
    const onchangeHandler=(field)=>(e)=>{
        setuserInfo({...userInfo,[field]:e.target.value})
        setaccumulatedUpdate({...accumulatedUpdate,[field]:e.target.value})
    }
    const submit=e=>{
        e.preventDefault()
        editUserProfile({update:accumulatedUpdate})
    }

    return (
        <Modal display={ProfileUpdateModalDisplay} setdisplay={setProfileUpdateModalDisplay} title="Edit profile Info">
            <form onSubmit={submit}>
                <Flex dir="column" >
                     <Input 
                         value={userInfo.full_name} 
                         placeholder="Full name" 
                         onChange={onchangeHandler('full_name')}  
                     />
                     <Input 
                         value={userInfo.country} 
                         placeholder="Country" 
                         onChange={onchangeHandler('country')} 
                     />
                     <Input 
                         value={userInfo.bio} 
                         placeholder="Bio"
                         onChange={onchangeHandler('bio')} 
                     />
                     <InputWrapper>
                         <DatePicker selected={new Date(userInfo.birth_date)} onChange={date => {
                              setuserInfo({...userInfo,birth_date:date})
                              setaccumulatedUpdate({...accumulatedUpdate,birth_date:date})
                         }} />
                     </InputWrapper>
                     <Submit type="submit" width="100%">Submit</Submit>
                </Flex>
            </form>
        </Modal>
    )
}

export default UpdateUserProfile
