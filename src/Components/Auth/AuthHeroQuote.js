import React from 'react'
import { connect } from 'react-redux'
import {AuthHeroQuote as QuoteText,AuthHeroQuoteWriter} from '../Common/Styled Components/Text'
import {Box} from '../Common/Styled Components/Container'


export const AuthHeroQuote = () => {
    return (
        <Box padding="0 0rem 0 1rem">
             <QuoteText  >   QUOTES IS WHERE THE WISDOM LIES   </QuoteText>
             <AuthHeroQuoteWriter>   by Joseph Harold </AuthHeroQuoteWriter>
        </Box>
    )
}



export default connect(null, null)(AuthHeroQuote)
