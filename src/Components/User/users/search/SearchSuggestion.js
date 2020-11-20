import React  from 'react'
import UserBall from '../../UserBall'

export const SearchSuggestion = (props) => {
    const {full_name,id,image}=props
    
    return (
      <UserBall {...{briefUserInfo:{full_name,id,image}}} />
    );
}


export default SearchSuggestion
