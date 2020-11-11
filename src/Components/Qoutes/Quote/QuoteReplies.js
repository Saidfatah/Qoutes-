import React from 'react'

const QuoteReplies=({replies})=> {
    return (
        <div>
            {replies.map((reply,i) => <p key={i}>{reply.user_name} : {reply.reply_text}</p> )}
        </div>
    )
}

export default QuoteReplies
