// import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderCreator } from 'seed-ui';
import { DepthMenuList } from './assets/DepthMenuList.jsx';
import Logo from './components/Main/Logo';
import Footer from "./components/Main/Footer.jsx";

function Index() {
  return (
    <>
      <HeaderCreator
        logoSetting={{
          logo: <Logo />,
          logoLink: '/',
          logoColor: 'white',
        }}
        menuList={DepthMenuList}
        useDepth
        userRole={1}
      >
      </HeaderCreator>
      <Outlet />
      <Footer />
    </>
  );
}

export default Index;
