import React from 'react'
import { withFormik } from 'formik'

import { Label, Input, FormContainer, SingleInputContainer } from './styles'
import { MenuItem } from '../../styles'

const InnerForm = ({ values, handleChange, handleBlur, handleSubmit }) => (
  <FormContainer onSubmit={handleSubmit}>
    <SingleInputContainer>
      <Label htmlFor="host">Host:</Label>
      <Input
        type="text"
        name="host"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.host}
      />
    </SingleInputContainer>
    <SingleInputContainer>
      <Label htmlFor="port">Port:</Label>
      <Input
        type="text"
        name="port"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.port}
      />
    </SingleInputContainer>
    <MenuItem onClick={handleSubmit}>Back</MenuItem>
  </FormContainer>
)

const HostForm = withFormik({
  mapPropsToValues: ({ host, port }) => ({ host, port }),
  handleSubmit: (values, { props }) => {
    props.onChangeHost(values.host, values.port)
  },
})(InnerForm)

export default HostForm
