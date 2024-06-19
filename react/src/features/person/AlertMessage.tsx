import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";

const AlertMessage = (displayState: string) => {
  return (
    <Alert status='success' display={displayState} variant='solid'>
      <AlertIcon/>
      <AlertTitle>Deleted</AlertTitle>
      <AlertDescription>Person has been successfully deleted</AlertDescription>
      <CloseButton position='absolute' top='6px' right='6px' onClick = {() => {displayState = "none";}}/>
    </Alert>
  );
};

export default AlertMessage
