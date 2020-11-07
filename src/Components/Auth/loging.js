import React,{useState} from 'react'
import { connect } from 'react-redux'


const Loging=({login})=> {
    const [email, setemail] = useState("ali@sali.com")
    const [password, setpassword] = useState("123456")

    const handleSubmit=e=>{
        e.preventDefault()
        login({email,password})
    }

    return (
        <div>
            <h3>Loging</h3>
            <form onSubmit={handleSubmit}>
                <input 
                      value={email} 
                      onChange={e => setemail(e.target.value)}
                      placeholder="Full name"/>
                <input 
                      value={password} 
                      onChange={e => setpassword(e.target.value)}
                      placeholder="Password"/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default connect(
    state=>({
        registerSuccess: state.auth.registerSuccess
    }), 
    dispatch=>({
        login: dispatch.auth.login,
    }))
(Loging)