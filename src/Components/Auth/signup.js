import React,{useState} from 'react'
import { connect } from 'react-redux'
import Error from '../Common/Error/Error'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const userInfoIntial ={
    full_name: "ali fatah",
    user_name: "aliAli",
    email: "ali@sali.com",
    password: "123456",
    country: "morroco",
    birth_date: "" ,
}

const Signup=({error,IsAuthenticated,signup})=> {
    const [userInfo, setuserInfo] = useState({...userInfoIntial})
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit=e=>{
        e.preventDefault()
        userInfo.birth_date=startDate
        signup(userInfo)
    }
    const handleChange= field => e => setuserInfo({...userInfo,[field]:e.target.value})


    if(IsAuthenticated)return null
    return (
        <div>
            <h3>sign up </h3>
            <Error trigger={error.id==="USER_CREATION_FAILED"} message={error.message} />
            <Error trigger={error.id==="USER_EMAIL_EXISTS"} message={error.message} />
            <Error trigger={error.id==="USER_CREATION_FAILED"} message={error.message} />
            <form onSubmit={handleSubmit}>
                <input value={userInfo.full_name} onChange={handleChange('full_name')} placeholder="Full name"/>
                <input value={userInfo.user_name} onChange={handleChange('user_name')}  placeholder="User name"/>
                <input value={userInfo.email}     onChange={handleChange('email')}      placeholder="Email"/>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <button type="submit">sign up</button>
            </form>
        </div>
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