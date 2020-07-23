import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Products',
    icon: 'lock-outline',
    children: [
      {
        title: 'Product-list',
        link: '/pages/products',
        home:true
      },
      {
        title: 'Add new product ',
        link: '/pages/newproduct'
      }
    ],
  },
  {
    title: 'Categories',
    icon: 'shopping-cart-outline',
    link: '/pages/categories',
    home: true,
  }
];
