import auth from '../../middlewares/auth';
export const courseCurriculumRoute = [
  {
    path: '/course/curriculum/list',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_curriculum/CourseCurriculumList'
      ),
    name: 'course_curriculum_list',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/curriculum/add',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_curriculum/CourseCurriculumForm'
      ),
    name: 'course_curriculum_add',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/course/curriculum/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../../views/course_curriculum/CourseCurriculumForm'
      ),
    name: 'course_curriculum_edit',
    meta: {
      middleware: [auth],
    },
  },
];
