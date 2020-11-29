import React,{useState,useEffect}  from 'react'
import { connect } from 'react-redux'
import SearchSuggestion from './SearchSuggestion'
import Autosuggest from 'react-autosuggest';
import {AutoSuggestionContainer} from '../../../Common/Styled Components/Container'



export const UserSearch = ({searched_users,searchUsers,clearSearchedUsers}) => {
    const [suggestions, setsuggestions] = useState([])
    const [value, setvalue] = useState("")

     useEffect(() => {
         console.log({searched_users})
         if(searched_users != null)setsuggestions(searched_users)
     }, [searched_users])
     

     const onChange = (e,{newValue }) => {setvalue(newValue) };
     const inputProps = {
        placeholder: 'Users',
        value,
        onChange: onChange
      };
     
     const getSuggestionValue = suggestion => {
         return suggestion.full_name;
     }
  
     const onSuggestionsFetchRequested = () => {
         console.log(value)
         searchUsers(value)
     };
     const onSuggestionsClearRequested = () => {
        clearSearchedUsers()
     };


  

    return (
        <AutoSuggestionContainer>
             <Autosuggest
               suggestions={suggestions}
               onSuggestionsFetchRequested={onSuggestionsFetchRequested}
               onSuggestionsClearRequested={onSuggestionsClearRequested}  
               getSuggestionValue={getSuggestionValue}
               renderSuggestion={SearchSuggestion}
               inputProps={inputProps}
             />
        </AutoSuggestionContainer>
    )
}



export default connect(
    state=>({
        searched_users     : state.users.searched_users
    }), 
    dispatch=>({
        searchUsers        :dispatch.users.searchUsers ,
        clearSearchedUsers :dispatch.users.clearSearchedUsers ,
    })
    )
(UserSearch)
