export interface MenuItem {
  id: number;
  name: string;
  icon: string;
  route?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'LAYOUT.DASHBOARD',
    icon: 'bi bi-house',
    route: '/layout/dashboard',
  },
  {
    id: 3,
    name: 'LAYOUT.TO_DO_LIST',
    icon: 'bi bi-list-check',
    route: '/layout/bucket',
  },
  // {
  //   id: 5,
  //   name: 'LAYOUT.ADD_SUBJECT',
  //   icon: 'bi bi-plus',
  //   route: '/layout/button',
  // },
  // { id: 6, name: 'LAYOUT.CHAT', icon: 'bi bi-chat' },
  // { id: 7, name: 'LAYOUT.BUDGET', icon: 'bi-wallet' },
];
