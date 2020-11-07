import React from 'react'
import { Wrapper, LeftColumn, MiddleColumn, RightColumn, Avatar, Name } from './styled'
import FollowButton from '../buttons/FollowButton'
const UserCard=({ user, onFollowClick })=> {
    return (
        <Wrapper>
        <LeftColumn>
          <Avatar src={user.picture} />
        </LeftColumn>
        <MiddleColumn>
          <Name>{user.name}</Name>
        </MiddleColumn>
        <RightColumn>
          <FollowButton isActive={user.isFollowing} onClick={() => onFollowClick(user)} />
        </RightColumn>
      </Wrapper>
    )
}

export default UserCard
