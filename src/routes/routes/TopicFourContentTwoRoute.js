import auth from '../../middlewares/auth';
export const TopicFourContentTwoRoute  = [
  {
    path: '/topic/four/content/two',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_four/TopicFourContentTwoForm'
      ),
    name: 'topic_four_content_two',
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
