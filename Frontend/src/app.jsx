import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComp from "./Components/navbar/navbarComp";
import FooterComp from "./Components/footer/footerComp";
import SideBarDrawer from "./Components/sideBarDrawer/sideBarDrawer";
import { UserProvider } from "./Components/userContext";
import "./app.css";
const localUser = JSON.parse(localStorage.getItem("user"));
const App = () => {
  return (
    <div className="app">
      <UserProvider>
        <NavbarComp />
        {/* <SideBarDrawer /> */}
        <Outlet></Outlet>
        <FooterComp />
      </UserProvider>
    </div>
  );
};

export default App;
