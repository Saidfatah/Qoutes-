import styled from 'styled-components'
import colors from './colors'
export const Flex = styled.div`
width:100%;
height:100%;
display:flex;
align-items:${({align})=>align?align:'center'};
flex-direction:${(props)=>props.dir? props.dir :"row"};
justify-content:${(props)=>props.justify? props.justify :"left"};
`
export const FlexItem = styled.div`
flex:${({flex})=>flex};
width:100%;
height:100%;
`


export const Frame = styled.div`
width      : ${({width})=>width};
height     : ${({height})=>height};
`

export const Border = styled.div`
  ${({border})=>"border-"+border+":1px solid "+colors.borderColor }
`
export const Box = styled.div`
  ${({padding})=>padding?"padding:"+padding:""}
  ${({margin})=>margin?"margin:"+margin:""}
`



export const Background = styled.div`
background : ${({bgColor})=>bgColor};
width:100%;
height:100%;
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