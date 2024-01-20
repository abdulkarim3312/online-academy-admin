import auth from "../../middlewares/auth";
export const packageRoute = [
  {
    path: '/package/list',
    component: () => import(/* webpackChunkName: "packages" */ '../../views/packages/PackageList'),
    name: 'package_list',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/package/add',
    component: () => import(/* webpackChunkName: "packages" */ '../../views/packages/PackageForm'),
    name: 'package_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/package/edit/:id',
    component: () => import(/* webpackChunkName: "packages" */ '../../views/packages/PackageForm'),
    name: 'package_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  }
];