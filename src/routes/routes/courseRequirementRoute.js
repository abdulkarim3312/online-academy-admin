import auth from '../../middlewares/auth';
export const courseRequirementRoute = [
  {
    path: '/course/requirement/list',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_requirement/CourseReqList'
      ),
    name: 'course_requirement_list',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/requirement/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_requirement/CourseReqForm'
      ),
    name: 'course_requirement_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/requirement/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_requirement/CourseReqForm'
      ),
    name: 'course_requirement_edit',
    meta: {
      middleware: [auth],
    },
  },
];
