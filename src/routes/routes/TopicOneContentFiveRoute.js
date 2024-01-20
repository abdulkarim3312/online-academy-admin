import auth from '../../middlewares/auth';
export const TopicOneContentFiveRoute = [
  {
    path: '/topic/one/content/five',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/topic_one/TopicOneContentFiveForm'
      ),
    name: 'topic_one_content_five',
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
