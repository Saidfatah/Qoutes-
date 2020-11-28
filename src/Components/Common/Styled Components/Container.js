import styled from 'styled-components'

export const Flex = styled.div`
width:100%;
display:flex;
align-items:${({align})=>align?align:'center'};
flex-direction:${(props)=>props.dir? props.dir :"row"};
justify-content:${(props)=>props.justify? props.justify :"left"};
`
export const FlexItem = styled.div`
flex:${({flex})=>flex};
`


export const Frame = styled.div`
width      : ${({width})=>width};
height     : ${({height})=>height};
`
export const Background = styled.div`
background : ${({bgColor})=>bgColor};
`
export const FlashMessage = styled.div`
position:absolute ; 
display:${({display})=>display};
top:50px;
left:50%;
transform: translateX(-50%);
`

export const Tag = styled.div`
padding    : .5rem 1rem;
background : ${({bgColor})=>bgColor};
color      : ${({color})=>color};
text-align : center ;
`

export const Card = styled.div`
align-items:center;
padding:1rem;
margin_bottom:${(props)=>props.mgb? props.mgb :0}rem;
`

export const AutoSuggestionContainer = styled.div`
   ul,ol{
       list-style : none;
   }
`