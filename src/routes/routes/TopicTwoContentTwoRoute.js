import auth from '../../middlewares/auth';
export const TopicTwoContentTwoRoute = [
  {
    path: '/topic/two/content/two',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_two/TopicTwoContentTwoForm'
      ),
    name: 'topic_two_content_two',
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
