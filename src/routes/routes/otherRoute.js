import auth from "../../middlewares/auth";
export const otherRoute = [
  {
    path: '/home-banner',
    component: () => import(/* webpackChunkName: "others" */ '../../views/banner/HomeBanner'),
    name: 'home_banner',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/home-banner/add',
    component: () => import(/* webpackChunkName: "others" */ '../../views/banner/Form'),
    name: 'home_banner_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/home-banner/edit/:id',
    component: () => import(/* webpackChunkName: "others" */ '../../views/banner/Form'),
    name: 'home_banner_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];