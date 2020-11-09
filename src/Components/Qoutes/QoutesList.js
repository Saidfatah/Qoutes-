import React  from 'react'
import Quote from './Quote/Quote'

const QoutesList = ({quotes}) => {

    if(!quotes.length) return <p>no qoutes loaded</p>
    
    return (
        <div>
            {quotes.map((quote,i)=> <Quote key={i} quote={quote} />)}
        </div>
    )
}


export default QoutesList