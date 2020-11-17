import styled from 'styled-components'

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
  background: ${props => props.isActive ? '#22d827' : '#107EFF'};
  color: white;
  border: none;
  padding: .25rem 1rem;
  font-size: 1rem;
  border-radius: 10rem;
  width:${({width})=>width?width:"fit-content"};
  &:hover {
    cursor: pointer;
    background: ${props => props.isActive ? '#4af54f' : '#00a1ff'};
}`