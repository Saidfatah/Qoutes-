import styled from 'styled-components'
import colors from './colors'
const{linkColor,submitButtonColor,submitButtonHoverColor,linkHoverColor,black}=colors

export const Button = styled.button`
  background: ${props => props.isActive ? '#22d827' : '#107EFF'};
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.4rem;
  border-radius: 10rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.isActive ? '#4af54f' : '#00a1ff'};
}`

export const Submit = styled.button`  
  background: ${submitButtonColor};
  color: white;
  border: none;
  padding: .25rem 1rem;
  font-size: 1rem;
  font-family: Bbold;
  border-radius: 5px;
  width:${({width})=>width?width:"fit-content"};
  &:hover {
    cursor: pointer;
    background: ${submitButtonHoverColor};
}`

export const Link = styled.button`
  background:none;
  color: ${linkColor};
  border: none;
  padding: 0rem 1rem;
  font-size: 1rem;
  font-family: FuturaLight;
  &:hover {
    cursor: pointer;
    color:linkHoverColor;
  }
`

export const FollowButton = styled.button`
  background: ${props => props.isActive ? '#22d827' : '#107EFF'};
  color: white;
  border: none;
  padding: .25rem 1rem;
  font-size: 1rem;
  border-radius: 10rem;
  width:${({width})=>width?width:"fit-content"};
  &:hover {
    cursor: pointer;
    background: ${props => props.isActive ? props.isActiveColor : props.inActiveColor};
}`