import React,{useState,useEffect}  from 'react'
import { connect } from 'react-redux'
import SearchSuggestion from './SearchSuggestion'
import Autosuggest from 'react-autosuggest';
import {AutoSuggestionContainer} from '../../../Common/Styled Components/Container'



export const UserSearch = ({suggested_users,suggestUsers,clearSuggestedUser}) => {
    const [suggestions, setsuggestions] = useState([])
    const [value, setvalue] = useState("")

     useEffect(() => {
         if(suggested_users != null)setsuggestions(suggested_users)
     }, [suggested_users])
     

     const onChange = (e,{newValue }) => {setvalue(newValue) };
     const inputProps = {
        placeholder: 'Users',
        value,
        onChange: onChange
      };
     
     const getSuggestionValue = suggestion => {
         console.log({suggestion})
         return suggestion.full_name;
     }
  
     const onSuggestionsFetchRequested = () => {
        suggestUsers(value)
     };
     const onSuggestionsClearRequested = () => {
        clearSuggestedUser()
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
        suggested_users : state.users.suggested_users
    }), 
    dispatch=>({
        suggestUsers:dispatch.users.suggestUsers ,
        clearSuggestedUser:dispatch.users.clearSuggestedUser ,
    })
    )
(UserSearch)
