import auth from '../../middlewares/auth';
export const productOutcomeRoute = [
  {
    path: '/product/outcome/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductOutcomeForm'
      ),
    name: 'product_outcome',
    meta: {
      middleware: [auth],
    },
  },
];
