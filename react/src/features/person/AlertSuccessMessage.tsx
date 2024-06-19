import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";
import {useState} from "react";

const AlertSuccessMessage = () => {
  const [state, setState] = useState("none");
  return (
    <Alert status='success' display={state} variant='solid'>
      <AlertIcon/>
      <AlertTitle>Deleted</AlertTitle>
      <AlertDescription>Person has been successfully deleted</AlertDescription>
      <CloseButton position='absolute' top='6px' right='6px' onClick = {() => {setState("none");}}/>
    </Alert>
  );
};

export default AlertSuccessMessage