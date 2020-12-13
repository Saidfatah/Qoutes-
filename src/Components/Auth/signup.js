import React,{useState} from 'react'
import { connect } from 'react-redux'
import Error from '../Common/Error/Error'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Flex,InputContainer,Input,Frame} from '../Common/Styled Components/Container'
import {Label,Paragraph,H1} from '../Common/Styled Components/Text'
import {Submit,Link} from '../Common/Styled Components/Buttons'
import colors from '../Common/Styled Components/colors'
import {useSpring, animated} from 'react-spring'

const userInfoIntial ={
    full_name: "ali fatah",
    user_name: "aliAli",
    email: "ali@sali.com",
    password: "123456",
    country: "morroco",
    birth_date: "" ,
}

const Signup=({error,IsAuthenticated,signup,settoggleAuth})=> {
    const [userInfo, setuserInfo] = useState({...userInfoIntial})
    const [startDate, setStartDate] = useState(new Date());
    const [inputContairesFocused, setinputContairesFocused] = useState([false,false,false,false]);
    const props = useSpring({opacity: 1, from: {opacity: 0},delay:250,MozAnimationTimingFunction:"step-end"})

    const handleSubmit=e=>{
        e.preventDefault()
        userInfo.birth_date=startDate
        signup(userInfo)
    }
    const handleChange= field => e => setuserInfo({...userInfo,[field]:e.target.value})

    const handleInputContainerFocus=index=>{
        const focusedTemp  = [...inputContairesFocused].map(v=>false)
        focusedTemp[index] = true
        setinputContairesFocused(focusedTemp)
    }

    if(IsAuthenticated)return null
    return (
        <animated.div style={props}>
            <H1 align="center">Create your account</H1>
            <Error trigger={error.id==="USER_CREATION_FAILED"} message={error.message} />
            <Error trigger={error.id==="USER_EMAIL_EXISTS"} message={error.message} />
            <Error trigger={error.id==="USER_CREATION_FAILED"} message={error.message} />
            <form onSubmit={handleSubmit}>
                <Frame width="100%">
                     <Flex dir="column"> 
                         <InputContainer 
                          onFocus={e=>handleInputContainerFocus(0)}
                          focused={inputContairesFocused[0]}
                          width={"500px"}
                          >
                              <Label focused={inputContairesFocused[0]}>Full name  </Label>
                              <Input value={userInfo.full_name} onChange={handleChange('full_name')} placeholder="Full name"/>
                         </InputContainer>
                         <InputContainer 
                          onFocus={e=>handleInputContainerFocus(1)}
                          focused={inputContairesFocused[1]}
                          width={"500px"}
                          >
                              <Label focused={inputContairesFocused[1]}>User name  </Label>
                              <Input value={userInfo.user_name} onChange={handleChange('user_name')}  placeholder="User name"/>
                         </InputContainer>
                         <InputContainer 
                          onFocus={e=>handleInputContainerFocus(2)}
                          focused={inputContairesFocused[2]}
                          width={"500px"}
                          >
                              <Label focused={inputContairesFocused[2]}>Email</Label>
                              <Input value={userInfo.email}     onChange={handleChange('email')}      placeholder="Email"/>
                         </InputContainer>
                         <InputContainer 
                          onFocus={e=>handleInputContainerFocus(3)}
                          focused={inputContairesFocused[3]}
                          width={"500px"}
                          >
                              <Label focused={inputContairesFocused[3]}>Date of birth</Label>
                              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                         </InputContainer>
                     
                          <Submit type="submit"   >SIGNEUP</Submit>
                          <Flex  justify="center" >
                              <Paragraph>already have an account  </Paragraph>
                              <Link onClick={e=>settoggleAuth(true)}>logg in </Link>
                          </Flex>
                     </Flex>
                </Frame>
            </form>
        </animated.div>
    )
}

export default connect(
    state=>({
        IsAuthenticated: state.auth.IsAuthenticated,
        error:  state.error,
    }), 
    dispatch=>({
        signup: dispatch.auth.signup,
    }))
(Signup)