import auth from "../../middlewares/auth";
export const orderListRoute = [
  {
    path: '/order/list',
    component: () => import(/* webpackChunkName: "packages" */ '../../views/orders/OrderList'),
    name: 'order_list',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/order/details/:id',
    component: () => import(/* webpackChunkName: "packages" */ '../../views/orders/OrderDetails'),
    name: 'order_details',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];