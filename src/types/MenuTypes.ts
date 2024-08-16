type NavMenuItemType = {
  title: string;
  path: string;
};

type NavMenuSubMenuItemType = {
  title: string;
  subMenu: NavMenuItemType[];
};

type NavMenuType = (NavMenuItemType | NavMenuSubMenuItemType)[];

type FooterMenuItemType = {
  title: string;
  path: string;
};

type FooterMenuType = FooterMenuItemType[];

export type {
  NavMenuItemType,
  NavMenuSubMenuItemType,
  NavMenuType,
  FooterMenuItemType,
  FooterMenuType,
};
