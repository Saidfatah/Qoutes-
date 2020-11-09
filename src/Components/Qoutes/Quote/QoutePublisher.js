import React from 'react'
import UserImage from '../../Common/user/UserImage'
import UserInfo from '../../Common/user/UserInfo'
import {Flex} from '../../Common/containers/styled'

const QoutePublisher = ({quote_publisher}) => {
    const {image,user_name,full_name}=quote_publisher
    return (
        <Flex>
            <UserImage image={image} />
            <UserInfo {...{full_name,user_name}}/>
        </Flex>
    )
}

export default QoutePublisher
