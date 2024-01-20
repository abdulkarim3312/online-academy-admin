import auth from '../../middlewares/auth';
export const productWelcomeRoute = [
  {
    path: '/product/welcome/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductWelcomeForm'
      ),
    name: 'product_welcome',
    meta: {
      middleware: [auth],
    },
  },
];
