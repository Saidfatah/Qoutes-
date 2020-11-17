import styled from 'styled-components'

export const Input = styled.input`
padding:1rem;
width:100%;
padding:${({padding})=>padding?padding:0.5}rem;
margin-bottom:${({mgb})=>mgb?mgb:1}rem;
`

export const InputWrapper = styled.div`
width:100%;

input{
    width:100%;
    padding:${({padding})=>padding?padding:0.5}rem;
    margin-bottom:${({mgb})=>mgb?mgb:1}rem;
}
`

