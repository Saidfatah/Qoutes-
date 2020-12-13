import styled from 'styled-components'
import colors from './colors'
const {labelActiveColor,labelInActiveColor,black,normalParagraphColor}= colors


export const H1 = styled.h1`
font-family: Bbold;
font-weight: normal;
font-size:${({size})=>size||"2rem"};
text-align:${({align})=>align||"left"};
`
export const H3 = styled.h3`
font-size:${({size})=>size||"2rem"};
`

export const Label = styled.label`
font-size:.9rem;
font-family: FuturaLight;
color :${({focused})=>focused?labelActiveColor:labelInActiveColor};
`


export const Paragraph = styled.label`
font-size:1rem;
font-family: FuturaLight;
color :${normalParagraphColor};
`




export const CreatedAt = styled.h1`
font-size:.7rem;
`

export const AuthHeroQuote = styled.h1`
font-size:4rem;
font-family: Bbold;
font-weight: normal;
color : ${black} ; 
`
export const AuthHeroQuoteWriter = styled.h1`
font-size:1rem;
font-weight : 300 ; 
font-family: FuturaLightItalic;
color : ${black} ; 
font-style:italic;
`

