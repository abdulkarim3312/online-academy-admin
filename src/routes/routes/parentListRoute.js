import auth from "../../middlewares/auth";
export const parentListRoute = [
    {
        path: '/parent/list',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/parent/ParentList'),
        name: 'parent_list',
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/parent/add',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/parent/ParentForm'),
        name: 'parent_add',
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/parent/edit/:id',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/parent/ParentForm'),
        name: 'parent_edit',
        meta: {
            middleware: [
                auth
            ]
        }
    }
];