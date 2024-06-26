import {useLogout} from "./useLogout.ts";
import {Button} from "@chakra-ui/react";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button disabled={logout.isPending} colorScheme='twitter' onClick={() => logout.mutate()}>Logout</Button>
  );
};

export default LogoutButton;
