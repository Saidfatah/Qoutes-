import React from 'react'
import { connect } from 'react-redux'
import QuotePublisher from './QoutePublisher'
import QuoteUserActions from './QuoteUserActions'
import QuotePublicAcions from './QuotePublicAcions'
import QuotePostType from './QuotePostType'
import QuoteContent from './QuoteContent'
import QuoteReplies from './QuoteReplies'


export const Qoute = ({profileQuote,user,quote,remove,like,edit,reply,share}) => {
    const {quote_text ,quote_publisher,image ,created_at ,tags ,likes ,shared_by,liked_by ,replies} = quote   
    
    
    if(user === null) return null 
    
    const {followed}=user
    return (
        <div> 
             <QuotePostType {...{quote_publisher,user,profileQuote,shared_by,liked_by,followed}}/>
             <QuotePublisher  {...{quote_publisher,profileQuote,user}} /> 
             <QuoteContent {...{quote_text,image}} />
             {profileQuote && quote_publisher.id !== user.id ? <p>qoute was shared</p> : null}

            <div>
                 <QuoteUserActions {...{quote,remove,edit,visible:quote_publisher.id === user.id}}  />
                 <QuotePublicAcions {...{quote,like,reply,share,likes}} />
            </div>
            <QuoteReplies replies={replies} />
        </div>
    )
}


export default connect(
     state=>({
         user:state.auth.user,
         followed:state.auth.user,
    })
    , 
    dispatch=>({
    remove : dispatch.quotes.remove,
    edit   : dispatch.quotes.edit,
    like   : dispatch.quotes.like,
    share  : dispatch.quotes.share,
    reply  : dispatch.quotes.reply,
}))(Qoute)
