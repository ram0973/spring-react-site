import {useLogout} from "./useLogout.ts";
import {Button} from "@chakra-ui/react";
import React from "react";

export const LogoutButton: React.FC = () => {
  const logout = useLogout();
  return (
    <Button disabled={logout.isPending} colorScheme='twitter' onClick={() => logout.mutate()}>Logout</Button>
  );
}
