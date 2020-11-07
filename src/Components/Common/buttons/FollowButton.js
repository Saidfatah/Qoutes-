import React from 'react'
import { Button } from './styled'

export const FollowButton = ({ isActive, ...rest }) => {
    return (
        <Button isActive={isActive}  {...rest}>
            {isActive ? '✔ Following' : 'Follow'}
        </Button>
    )
}


export default FollowButton
