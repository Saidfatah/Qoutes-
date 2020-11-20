import styled from 'styled-components'

export const Flex = styled.div`
width:100%;
display:flex;
align-items:${({align})=>align?align:'center'};
flex-direction:${(props)=>props.dir? props.dir :"row"};
justify-content:${(props)=>props.justify? props.justify :"left"};
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