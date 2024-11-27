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
      id: 2,
      name: 'LAYOUT.PROFILE',
      icon: 'bi bi-calendar',
      route: '/layout/profile',
    },
    {
      id: 3,
      name: 'LAYOUT.TO_DO_LIST',
      icon: 'bi bi-list-check',
      route: '/layout/bucket',
    },
    { id: 5, name: 'LAYOUT.ADD_SUBJECT', icon: 'bi bi-plus' },
    { id: 6, name: 'LAYOUT.CHAT', icon: 'bi bi-chat' },
    { id: 7, name: 'LAYOUT.BUDGET', icon: 'bi-wallet' },
    { id: 9, name: 'LAYOUT.LOGOUT', icon: 'bi bi-box-arrow-in-right' },
  ];
  