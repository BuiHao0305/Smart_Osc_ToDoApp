export interface MenuItem {
    id: number;
    name: string;
    icon: string;
    route?: string;
  }
  
  export const MENU_ITEMS: MenuItem[] = [
    {
      id: 1,
      name: 'DASHBOARD',
      icon: 'bi bi-house',
      route: '/layout/dashboard',
    },
    {
      id: 2,
      name: 'PROFILE',
      icon: 'bi bi-calendar',
      route: '/layout/profile',
    },
    {
      id: 3,
      name: 'TO_DO_LIST',
      icon: 'bi bi-list-check',
      route: '/layout/bucket',
    },
    { id: 5, name: 'ADD_SUBJECT', icon: 'bi bi-plus' },
    { id: 6, name: 'CHAT', icon: 'bi bi-chat' },
    { id: 7, name: 'BUDGET', icon: 'bi-wallet' },
    { id: 9, name: 'LOGOUT', icon: 'bi bi-box-arrow-in-right' },
  ];
  