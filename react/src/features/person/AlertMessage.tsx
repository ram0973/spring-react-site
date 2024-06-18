import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";

const AlertMessage = () => {
  const [display, setDisplay] = React.useState('none');

  function showMessage() {
    setDisplay('flex');
  }

  function closeMessage() {
    setDisplay('none');
  }

  return (
    <Alert status='success' display={display} variant='solid'>
      <AlertIcon/>
      <AlertTitle>Deleted</AlertTitle>
      <AlertDescription>Person has been successfully deleted</AlertDescription>
      <CloseButton position='absolute' top='6px' right='6px' onClick={closeMessage}/>
    </Alert>
  );
};

export default AlertMessage;