import auth from '../../middlewares/auth';
export const TopicThreeContentOneRoute = [
  {
    path: '/topic/three/content/one',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_three/TopicThreeContentOneForm'
      ),
    name: 'topic_three_content_one',
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
