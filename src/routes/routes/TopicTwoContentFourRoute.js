import auth from '../../middlewares/auth';
export const TopicTwoContentFourRoute = [
  {
    path: '/topic/two/content/four',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_two/TopicTwoContentFourForm'
      ),
    name: 'topic_two_content_four',
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
