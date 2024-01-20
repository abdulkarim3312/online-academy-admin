import auth from '../../middlewares/auth';
export const productRoute = [
  {
    path: '/product/list',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductList'
      ),
    name: 'product_list',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/product/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductForm'
      ),
    name: 'product_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/product/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/products/ProductForm'
      ),
    name: 'product_edit',
    meta: {
      middleware: [auth],
    },
  },
];
