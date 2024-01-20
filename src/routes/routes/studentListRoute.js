import auth from "../../middlewares/auth";
export const studentListRoute = [
    {
        path: '/student/list',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/student/StudentList'),
        name: 'student_list',
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/student/add',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/student/StudentForm'),
        name: 'student_add',
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/student/edit/:id',
        component: () => import(/* webpackChunkName: "members" */ '../../views/members/student/StudentForm'),
        name: 'student_edit',
        meta: {
            middleware: [
                auth
            ]
        }
    }
];