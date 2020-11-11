import React from 'react'

const QuoteUserActions=({edit,quote,remove,visible})=> {
    const quote_text ="qoute updated"
    const image ="no_image"
    if(!visible) return null
    return (
        <div>
             <button onClick={e=>{ edit({
                  quote,
                  image,
                  quote_text
                }) }}>edit</button>
             <button onClick={e=>{ remove(quote) }}>remove</button>
        </div>
    )
}

export default QuoteUserActions
