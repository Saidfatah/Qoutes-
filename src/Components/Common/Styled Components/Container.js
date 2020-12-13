import styled from 'styled-components'
import colors from './colors'
const {InputFocusedBorderColor,InputBluredBorderColor}=colors

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
position   :${({position})=>position?position:"relative"};

width:100%;
height:100%;
`


export const Frame = styled.div`
width      : ${({width})=>width?width:"fit-content"};
height     : ${({height})=>height?height:"fit-content"};
position   :${({position})=>position?position:"relative"};
z-index    :${({zIndex})=>zIndex?zIndex:"0"};
top    : ${({top})    =>  top  || "0px" };
left   : ${({left})   =>  left || "0px" };
${({transform})=>transform ? "transform:"+transform :"" };
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
export const Input = styled.input`
  padding  : .25rem;
  border   : none;
  font-family: Bbold;
  font-weight:bold;
  &:focus {
    outline: none;
  }
`
export const InputContainer = styled.div`
  padding        : .25rem;
  background     : #fff;
  display        : flex  ;
  width          : ${({width})=>width?width:"fit-content"};
  border         : 1px solid ${({focused})=>focused ? InputFocusedBorderColor : InputBluredBorderColor } ;
  flex-direction : column;
  border-radius  : 12px ;   
  margin-bottom  : .5rem;
  input:focus {
    outline: none;
  }
  input {
    border:none;
  }
`
export const Gradiant = styled.div`
height:100%;
background: ${colors.gradiantColors.color1};
background: linear-gradient(-144deg, ${colors.gradiantColors.color1}  9%, ${colors.gradiantColors.color2} 251%);
`
export const Absolute = styled.div`
position:absolute;
top    : ${({top})    =>  top  || "0px" };
left   : ${({left})   =>  left || "0px" };
width  : ${({width})  =>  width  || "100%" };
height : ${({height}) =>  height  || "100%" };
${({transform})=>transform ? "transform:"+transform :"" };
`
export const Image = styled.img`
 width   : ${({width})  =>  width  || "fit-content" };
 height   : ${({height})  =>  height  || "fit-content" };
 text-align: center;
 object-fit: scale-down;
 display:block ; 
 margin-left: auto;
 margin-right: auto;

`

