import auth from '../../middlewares/auth';
export const TopicThreeContentTwoRoute = [
  {
    path: '/topic/three/content/two',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_three/TopicThreeContentTwoForm'
      ),
    name: 'topic_three_content_two',
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
