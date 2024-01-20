import auth from '../../middlewares/auth';
export const productOverviewRoute = [
  {
    path: '/product/overview/list',
    component: () => import(/* webpackChunkName: "plans" */ '../../views/products/ProductOverviewList'),
    name: 'product_overview_list',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/product/overview/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductOverviewForm'
      ),
    name: 'product_overview_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/product/overview/edit',
    component: () => import(/* webpackChunkName: "plans" */ '../../views/products/ProductOverviewForm'),
    name: 'product_overview_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  }
];
