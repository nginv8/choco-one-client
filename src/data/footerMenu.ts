import routesList from './routesList';
import { FooterMenuType } from '@/types';

const footerMenu: FooterMenuType = [
  { ...routesList.about },
  { ...routesList.contactUs },
  { ...routesList.delivery },
  { ...routesList.privacyPolicy },
  { ...routesList.termsAndConditions },
];

export default footerMenu;
