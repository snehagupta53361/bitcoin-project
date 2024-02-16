import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <Alert
    status='error'
    position={'fixed'}
    bottom={'4'}
    p={'8'}
    >
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default ErrorMessage