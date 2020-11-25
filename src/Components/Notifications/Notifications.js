import React from 'react'
import { connect } from 'react-redux'
import NotificationLink from './NotificationLink'
import {Flex} from '../Common/Styled Components/Container'

export const Notifications = ({notifications , checkNotification}) => {

    return (
        <Flex>
             notifications : <br />
            {notifications.map((notification,index)=> <NotificationLink key={index} {...{notification,checkNotification}}/>)}
        </Flex>
    )
}

 

export default connect(
     state    => ({notifications      : state.notifications.notifications }),
     dispatch => ({checkNotification  : dispatch.notifications.checkNotification })
)(Notifications)
