import React from 'react'

const QuotePublicAcions=({quote,like,reply,share})=> {
    return (
        <div>
            <button onClick={e=>{ like(quote) }}>like</button>
            <button onClick={e=>{ reply({
                  quote,     
                  reply_text :"haha this is deep",
                  id:"a7Fr8ODkeKUMk0e73t4eQHkF6bE3" ,
                  image:"no_image", 
                  user_name :"mohMo"}) }}>reply</button>
            <button onClick={e=>{ share(quote) }}>share</button>
        </div>
    )
}

export default QuotePublicAcions
