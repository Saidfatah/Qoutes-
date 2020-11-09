import React from 'react'

const QuoteUserActions=({edit,qoute,remove,visible})=> {
    const new_qoute_Msg ="qoute updated"
  
    if(!visible) return null
    return (
        <div>
             <button onClick={e=>{ edit(new_qoute_Msg) }}>edit</button>
             <button onClick={e=>{ remove(qoute) }}>remove</button>
        </div>
    )
}

export default QuoteUserActions
