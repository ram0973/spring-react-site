import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";

export const FrontLayout = () => {
  return (
    <div className="lg:container lg:mx-auto">
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}
