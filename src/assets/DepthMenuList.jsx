// import DbmsReport from "../../../CLMREPORT_front/src/page/dbmsreport/DbmsReport.jsx";
// import PageTemplate from "../../../CLMREPORT_front/src/components/PageTemplate/PageTemplate.jsx";
import Profile from "../page/Profile.jsx";
import PageTemplate from "../components/PageTemplate/PageTemplate.jsx";
import Specsheet from "../page/Specsheet.jsx";

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
