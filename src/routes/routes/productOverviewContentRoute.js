import auth from '../../middlewares/auth';
export const productOverviewContentRoute = [
  {
    path: '/product/overview/content/list',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductOverviewContentList'
      ),
    name: 'product_overview_content_list',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/product/overview/content/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductOverviewContentForm'
      ),
    name: 'product_overview_content_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/product/overview/content/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductOverviewContentForm'
      ),
    name: 'product_overview_content_edit',
    meta: {
      middleware: [auth],
    },
  },
];
