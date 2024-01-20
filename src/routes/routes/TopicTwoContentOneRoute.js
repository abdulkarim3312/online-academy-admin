import auth from '../../middlewares/auth';
export const TopicTwoContentOneRoute = [
  {
    path: '/topic/two/content/one',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_two/TopicTwoContentOneForm'
      ),
    name: 'topic_two_content_one',
    meta: {
      middleware: [auth],
    },
  },
  // {
  //   path: '/product/add',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "products" */ '../../views/products/ProductForm'
  //     ),
  //   name: 'product_add',
  //   meta: {
  //     middleware: [auth],
  //   },
  // },
  // {
  //   path: '/product/edit/:id',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "products" */ '../../views/products/ProductForm'
  //     ),
  //   name: 'product_edit',
  //   meta: {
  //     middleware: [auth],
  //   },
  // },
];
