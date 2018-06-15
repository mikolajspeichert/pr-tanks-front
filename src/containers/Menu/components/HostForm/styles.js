import styled from 'styled-components'
import { colors } from '/src/styled/themes'

const Label = styled.label`
  font-size: 60px;
  margin: 20px;
  font-family: 'Invasion2000', sans-serif;
  color: ${colors.brown};
  text-shadow: 0 4px 2px black;
`

const Input = styled.input`
  font-family: 'Invasion2000', sans-serif;
  background-color: transparent;
  color: ${colors.brown};
  font-size: 50px;
  padding: 10px;
  width: 60%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  text-shadow: 0 4px 2px black;
  border: none;
  border-bottom: ${colors.orange} solid 2px;
`

const SingleInputContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export { Label, Input, FormContainer, SingleInputContainer }
