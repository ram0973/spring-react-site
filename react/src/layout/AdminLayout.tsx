import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import AdminNav from "./AdminNav.tsx";
import {HStack} from "@chakra-ui/react";

const AdminLayout = () => {

  return (
    <div className="lg:container lg:mx-auto">
      <Header/>
      <HStack>
      <AdminNav/>

      <Outlet/>

      </HStack>
      <Footer/>
    </div>
  )
}

export default AdminLayout;