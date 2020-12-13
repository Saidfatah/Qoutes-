import React,{useState} from 'react'
import { connect } from 'react-redux'
import {InputContainer,Input,Image,Frame,Flex} from '../Common/Styled Components/Container'
import {Submit,Link} from '../Common/Styled Components/Buttons'
import {Label,Paragraph,H1} from '../Common/Styled Components/Text'
import {useSpring, animated} from 'react-spring'

const Loging=({login,IsAuthenticated,settoggleAuth})=> {
    const [email, setemail] = useState("ali@sali.com")
    const [password, setpassword] = useState("123456")
    const [inputContairesFocused, setinputContairesFocused] = useState([false,false]);
    const props = useSpring({opacity: 1, from: {opacity: 0},delay:250,MozAnimationTimingFunction:"step-end"})

    const handleSubmit=e=>{
        e.preventDefault()
        login({email,password})
    }
    const handleInputContainerFocus=index=>{
        const focusedTemp  = [...inputContairesFocused].map(v=>false)
        focusedTemp[index] = true
        setinputContairesFocused(focusedTemp)
    }
  
    if(IsAuthenticated) return null
    return (
        <animated.div  style={props}>
            <H1  align="center">Log into your account </H1>
            <form onSubmit={handleSubmit}>
            <Frame position="inherit" width="100%">
                <Flex dir="column"> 
                    
                    <InputContainer   
                    onFocus={e=>handleInputContainerFocus(0)}
                    focused={inputContairesFocused[0]}
                    width={"500px"}
                    >
                        <Label focused={inputContairesFocused[0]}>Full name  </Label>
                        <Input 
                              value={email} 
                              onChange={e => setemail(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer   
                    onFocus={e=>handleInputContainerFocus(1)}
                    focused={inputContairesFocused[1]}
                    width={"500px"}
                    >
                        <Label focused={inputContairesFocused[1]}>Password</Label>
                        <Input 
                              value={password} 
                              onChange={e => setpassword(e.target.value)}
                        />
                    </InputContainer>
                    <Submit type="submit">LOGIN</Submit>
                    <Flex justify="center" >
                        <Paragraph>don't have an account  </Paragraph>
                        <Link onClick={e=>settoggleAuth(false)}>create One</Link>
                    </Flex>
                </Flex>
            </Frame>
            </form>
        </animated.div>
    )
}


export default connect(
    state=>({
        registerSuccess: state.auth.registerSuccess,
        IsAuthenticated: state.auth.IsAuthenticated,
    }), 
    dispatch=>({
        login: dispatch.auth.login,
    }))
(Loging)