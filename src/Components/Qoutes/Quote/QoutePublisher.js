import React from 'react'
import UserImage from '../../Common/user/UserImage'
import UserInfo from '../../Common/user/UserInfo'
import {Flex} from '../../Common/Styled Components/Container'

const QoutePublisher = ({quote_publisher,profileQuote,user}) => {
    const {image,user_name,full_name}=quote_publisher

    if( profileQuote && user.id === quote_publisher.id) return null
   
    return (
        <Flex>
            <UserImage image={image} />
            <UserInfo {...{full_name,user_name}}/>
        </Flex>
    )
}

export default QoutePublisher
