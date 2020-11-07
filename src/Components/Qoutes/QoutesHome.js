import React,{useEffect}  from 'react'
import { connect } from 'react-redux'
import QoutesList from './QoutesList'

export const QoutesHome = ({qoutes,loadHomeQoutes}) => {
    useEffect(() => {
        loadHomeQoutes()
    }, [])
    return <QoutesList qoutes={qoutes} />
}

export default connect(
    state=>({
        qoutes:state.quotes.qoutes_home 
    }), 
    dispatch =>({
        loadHomeQoutes:dispatch.quotes.loadHomeQoutes
    })
)(QoutesHome)
