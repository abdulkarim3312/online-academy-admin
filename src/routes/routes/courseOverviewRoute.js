import auth from '../../middlewares/auth';
export const courseOverviewRoute = [
  {
    path: '/course/overview/list',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_overview/CourseOverviewList'
      ),
    name: 'course_overview_list',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/overview/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_overview/CourseOverviewForm'
      ),
    name: 'course_overview_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/overview/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_overview/CourseOverviewForm'
      ),
    name: 'course_overview_edit',
    meta: {
      middleware: [auth],
    },
  },
];
