import  { useCallback, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AsideCreator } from 'seed-ui';
import styled from '@emotion/styled';
import TitleWrapper from './TitleWrapper';
import Logo from '../Main/Logo';
import {DepthMenuList} from "../../assets/DepthMenuList.jsx";

/**
 * @param {String} param.mainMenu
 * 메인 메뉴의 이름
 * ex) '관리'
 * @param {String} param.subMenu
 * 서브 메뉴(1차 뎁스 메뉴)의 이름
 * ex) 'DBMS 관리'
 * @param {Object []} param.routeList
 * 이동하고자 하는 2차 depth의 경로와 컴포넌트를 담은 값
 * ex) [{path: "transEndMaster", element: <TransEndMaster/>}]
 * @returns {JSX.Element} MainMenuTemplate Component
 */

// eslint-disable-next-line react/prop-types
function PageTemplate({ isSide = true, useTitle = true, children, state }) {
  const location = useLocation();
  const [mainMenu, setMainMenu] = useState({});
  const [subMenu, setSubMenu] = useState('');

  const getMenus = useCallback(() => {
    const pathList = location.pathname.slice(1).split('/');
    const currentMain = DepthMenuList.filter(el => el.link === pathList[0])[0];
    if (!currentMain) return;

    setMainMenu(currentMain);
    if (currentMain.subMenu !== undefined) {
      setSubMenu(currentMain.subMenu.filter(el => el.routePath === pathList[1])[0].title);
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    getMenus();
  }, [getMenus]);

  return isSide && subMenu !== '' ? (
    <AsideCreator
      menuList={mainMenu.subMenu}
      title={subMenu}
      logoSetting={{
        logo: <Logo />,
        logoLink: '/',
      }}
    >
      <PageBackground isSide={isSide}>
        {useTitle && <TitleWrapper />}
        <ContentWrapper isFlex={!!children}>
          {children}
          <Outlet context={state} />
        </ContentWrapper>
      </PageBackground>
    </AsideCreator>
  ) : (
    <PageBackground>
      {useTitle && <TitleWrapper />}
      <ContentWrapper isFlex={children}>
        {children}
        <Outlet context={state} />
      </ContentWrapper>
    </PageBackground>
  );
}

// background: ${({ theme }) => theme.colors.primary};
// background: ${({ theme }) => theme.colors['gray-0']};

const PageBackground = styled.div`
  min-height: ${({ isSide }) => (isSide === true ? 'calc(100vh - 160px)' : 'auto')};
  padding: 23px 18px 18px;
  box-sizing: border-box;

`;

const ContentWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  min-height: calc(100vh - 203px); // 상단 메뉴 높이 + 상단 여백 + 하단 여백 + Footer 높이 = 176
  padding: 18px;

  display: flex;
  flex-direction: column;
`;

export default PageTemplate;
