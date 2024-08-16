import routesList from './routesList';
import { NavMenuType } from '@/types';

const navMenu: NavMenuType = [
  { ...routesList.home },
  { ...routesList.ourProducts },
  { title: 'About', subMenu: [{ ...routesList.about }, { ...routesList.delivery }] },
  { ...routesList.contactUs },
];

export default navMenu;
