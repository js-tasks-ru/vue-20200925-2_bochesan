import PageA from '../views/PageA';
import PageB from '../views/PageB';
import BasePage from '../views/BasePage';

export const routes = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        path: 'a',
        component: PageA,
      },
      {
        path: 'b',
        name: 'b',
        component: PageB,
      },
    ],
  },
];
