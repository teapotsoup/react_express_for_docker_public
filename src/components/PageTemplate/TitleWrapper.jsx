import  { useState, useCallback, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
// import { DepthMenuList } from 'assets/DepthMenuList';
import { IoHomeSharp } from 'react-icons/io5';
import {DepthMenuList} from "../../assets/DepthMenuList.jsx";

function TitleWrapper() {
  const location = useLocation();
  const [menu, setMenu] = useState('');
  const [route, setRoute] = useState('');

  const findRoute = useCallback((pathList, routeList, prevDepthList) => {
    if (pathList.length === 0 || !prevDepthList) {
      return routeList;
    }

    const currentPath = pathList.shift();
    const currentDepth = prevDepthList.filter(el => {
      if (el.routePath) {
        return el.routePath === currentPath;
      }
      return el.link === currentPath;
    })[0];

    if (routeList.length > 1) {
      if (routeList[routeList.length - 1] !== currentDepth?.title) {
        routeList.push(currentDepth?.title);
      }
    } else {
      routeList.push(currentDepth?.title);
    }

    findRoute(pathList, routeList, currentDepth?.subMenu);
  }, []);

  useLayoutEffect(() => {
    const pathList = location.pathname.slice(1).split('/');
    const routeList = [];

    findRoute(pathList, routeList, DepthMenuList);

    setMenu(routeList.slice(-1));
    setRoute(routeList.join(' - '));
  }, [location.pathname, findRoute]);

  return (
    <Wrapper>
      <Title>{menu}</Title>
      <RouteInfo>
        <IoHomeSharp />
        {' - '}
        {route}
      </RouteInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  margin-bottom: 12px;
`;

// color: ${({ theme }) => theme.colors['gray-100']};


const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const RouteInfo = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  color: rgb(64, 64, 64);
  svg {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
`;

export default TitleWrapper;
