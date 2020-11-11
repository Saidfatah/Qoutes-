import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import QoutesList from './QoutesList'

export const QoutesHome = ({quotes,loadHomeQoutes}) => {
    useEffect(() => {
        loadHomeQoutes()
    }, [])
    return <div>
        <QoutesList quotes={quotes} />
        <button onClick={e=>loadHomeQoutes()} >load more </button>
    </div>
}

export default connect(
    state=>({
        quotes:state.quotes.qoutes_home ,
    }), 
    dispatch =>({
        loadHomeQoutes:dispatch.quotes.loadHomeQoutes,
    })
)(QoutesHome)
