import auth from '../../middlewares/auth';
export const TopicTwoContentThreeRoute = [
  {
    path: '/topic/two/content/three',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_two/TopicTwoContentThreeForm'
      ),
    name: 'topic_two_content_three',
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
