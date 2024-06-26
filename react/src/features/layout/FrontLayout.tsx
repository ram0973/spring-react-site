import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import "./layouts.css";
import Header from "./Header.tsx";

const FrontLayout = () => {
  return (
    <div className="lg:container lg:mx-auto">
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default FrontLayout;
