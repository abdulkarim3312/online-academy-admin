import auth from '../../middlewares/auth';
export const TopicTwoContentSixRoute = [
  {
    path: '/topic/two/content/six',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_two/TopicTwoContentSixForm'
      ),
    name: 'topic_two_content_six',
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
