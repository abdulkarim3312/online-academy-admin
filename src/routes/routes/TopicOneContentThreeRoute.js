import auth from '../../middlewares/auth';
export const TopicOneContentThreeRoute = [
  {
    path: '/topic/one/content/three',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_one/TopicOneContentThreeForm'
      ),
    name: 'topic_one_content_three',
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
