import Profile from "../page/Profile.jsx";
import PageTemplate from "../components/PageTemplate/PageTemplate.jsx";
import Specsheet from "../page/Specsheet.jsx";
import DiagramPage from "../page/DiagramPage.jsx";

export const DepthMenuList = [
  {
    title: 'profile',
    link: 'profile',
    component: (<PageTemplate isSide={false} ><Profile/></PageTemplate>),
  },
  {
    title: 'specsheet',
    link: 'specsheet',
    component:(<PageTemplate isSide={false} ><Specsheet/></PageTemplate>),
  },
  {
    title: 'diagram',
    link: 'diagram',
    component:(<PageTemplate isSide={false} ><DiagramPage/></PageTemplate>),
  },
  // {
  //   title: 'details',
  //   link: 'details',
  //   component: (<PageTemplate isSide={false} />),
  //   subMenu: [
  //     {
  //       title: 'loadouts',
  //       link: '/details/loadouts',
  //       routePath: 'tableUse',
  //       component: <TableUse/>,
  //     },
  //   ],
  // },
];
