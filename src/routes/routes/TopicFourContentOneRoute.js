import auth from '../../middlewares/auth';
export const TopicFourContentOneRoute  = [
  {
    path: '/topic/four/content/one',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_four/TopicFourContentOneForm'
      ),
    name: 'topic_four_content_one',
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
