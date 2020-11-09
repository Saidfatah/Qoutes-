import React from 'react'

const QuoteReplies=({replies})=> {
    return (
        <div>
            {replies.map(reply=><p>{reply.text}</p>)}
        </div>
    )
}

export default QuoteReplies
