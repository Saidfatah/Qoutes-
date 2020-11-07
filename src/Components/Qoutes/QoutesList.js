import React  from 'react'
import Qoute from './Qoute/Qoute'

const QoutesList = ({qoutes}) => {

    if(!qoutes.length) return <p>no qoutes loaded</p>
    
    return (
        <div>
            {qoutes.map((qoute,i)=> <Qoute key={i} qoute={qoute} />)}
        </div>
    )
}


export default QoutesList