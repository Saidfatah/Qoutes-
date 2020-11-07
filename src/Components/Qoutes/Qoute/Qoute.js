import React from 'react'
import { connect } from 'react-redux'
import QuotePublisher from './QoutePublisher'


export const Qoute = ({profileQuote,user,qoute,remove,like,edit,reply,share}) => {
    const {qoute_text ,quote_publisher,image ,created_at ,tags ,likes  ,replies} = qoute   
    const new_qoute_Msg ="qoute updated"
    if(user === null) return null 
    return (
        <div> 
            <QuotePublisher  {...{quote_publisher}} />
             {qoute_text}
             {profileQuote && quote_publisher.id !== user.id ? <p>qoute was shared</p> : null}
            <div>
             <>
                {quote_publisher.id === user.id
                ?<> 
                  <button onClick={e=>{ edit(new_qoute_Msg) }}>edit</button>
                  <button onClick={e=>{ remove(qoute) }}>remove</button>
                </>
                : null
                }
             </>
            <button onClick={e=>{ like(qoute) }}>like</button>
            <button onClick={e=>{ reply({qoute,message:"reply msg"}) }}>reply</button>
            <button onClick={e=>{ share(qoute) }}>share</button>
            </div>
            
        </div>
    )
}


export default connect(
     state=>({user:state.auth.user})
    , 
    dispatch=>({
    remove : dispatch.quotes.remove,
    edit   : dispatch.quotes.edit,
    like   : dispatch.quotes.like,
    share  : dispatch.quotes.share,
    reply  : dispatch.quotes.reply,
}))(Qoute)
