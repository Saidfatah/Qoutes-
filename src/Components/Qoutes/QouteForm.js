import React,{useState} from 'react'
import { connect } from 'react-redux'

export const QouteForm = ({add}) => {
    const [qouteMessage, setqouteMessage] = useState("")
    const [qouteTags, setqouteTags] = useState(["deep"])
    const [image, setImage] = useState("no_image")

    const submit=(e)=>{
        e.preventDefault()
        add({
            message: qouteMessage,
            tags :qouteTags,
            image
        })
    }
   

    return (
        <form onSubmit={submit}>
            <input value={qouteMessage} onChange={e=>setqouteMessage(e.target.value)} />
            <button type="submit">Post</button>
        </form>
    )
}


export default connect(
    null
    , 
    dispatch=>({
        add:dispatch.quotes.add
    })
    )(QouteForm)
