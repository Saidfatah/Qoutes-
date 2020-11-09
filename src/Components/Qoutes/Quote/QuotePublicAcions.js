import React from 'react'

const QuotePublicAcions=({quote,like,reply,share})=> {
    return (
        <div>
            <button onClick={e=>{ like(quote) }}>like</button>
            <button onClick={e=>{ reply({quote,message:"reply msg"}) }}>reply</button>
            <button onClick={e=>{ share(quote) }}>share</button>
        </div>
    )
}

export default QuotePublicAcions
