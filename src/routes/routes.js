import auth from '../middlewares/auth';
import guest from '../middlewares/guest';

import { parentListRoute } from '@/routes/routes/parentListRoute';
import { studentListRoute } from '@/routes/routes/studentListRoute';
import { productRoute } from '@/routes/routes/productRoute';
import { productWelcomeRoute } from '@/routes/routes/productWelcomeRoute';
import { productOutcomeRoute } from '@/routes/routes/productOutcomeRoute';
import { productOverviewRoute } from '@/routes/routes/productOverviewRoute';
import { productOverviewContentRoute } from '@/routes/routes/productOverviewContentRoute';
import { packageRoute } from '@/routes/routes/packageRoute';
import { orderListRoute } from '@/routes/routes/orderListRoute';
import { homeBannerRoute } from '@/routes/routes/homeBannerRoute';
import { courseOverviewRoute } from '@/routes/routes/courseOverviewRoute';
import { courseRequirementRoute } from '@/routes/routes/courseRequirementRoute';
import { courseCurriculumRoute } from '@/routes/routes/courseCurriculumRoute';
import { courseDetailsRoute } from '@/routes/routes/courseDetailsRoute';
import { TopicOneContentOneRoute } from '@/routes/routes/TopicOneContentOneRoute';
import { TopicOneContentTwoRoute } from '@/routes/routes/TopicOneContentTwoRoute';
import { TopicOneContentThreeRoute } from '@/routes/routes/TopicOneContentThreeRoute';
import { TopicOneContentFourRoute } from '@/routes/routes/TopicOneContentFourRoute';
import { TopicOneContentFiveRoute } from '@/routes/routes/TopicOneContentFiveRoute';
import { TopicTwoContentOneRoute } from '@/routes/routes/TopicTwoContentOneRoute';
import { TopicTwoContentTwoRoute } from '@/routes/routes/TopicTwoContentTwoRoute';
import { TopicTwoContentThreeRoute } from '@/routes/routes/TopicTwoContentThreeRoute';
import { TopicTwoContentFourRoute } from '@/routes/routes/TopicTwoContentFourRoute';
import { TopicTwoContentFiveRoute } from '@/routes/routes/TopicTwoContentFiveRoute';
import { TopicTwoContentSixRoute } from '@/routes/routes/TopicTwoContentSixRoute';
import { TopicThreeContentOneRoute } from '@/routes/routes/TopicThreeContentOneRoute';
import { TopicThreeContentTwoRoute } from '@/routes/routes/TopicThreeContentTwoRoute';
import { TopicFourContentOneRoute } from '@/routes/routes/TopicFourContentOneRoute';
import { TopicFourContentTwoRoute } from '@/routes/routes/TopicFourContentTwoRoute';
import { ExtendLearningRoute } from '@/routes/routes/ExtendLearningRoute';
import { AboutUsRoute } from '@/routes/routes/AboutUsRoute';
import { SiteLogoRoute } from '@/routes/routes/SiteLogoRoute';
import { otherRoute } from '@/routes/routes/otherRoute';

let routes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "auth" */ '../views/auth/Login'),
    name: 'login',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Index'),
    name: 'dashboard',
    meta: { auth },
  },
];

routes.push(...parentListRoute);
routes.push(...studentListRoute);
routes.push(...productRoute);
routes.push(...productWelcomeRoute);
routes.push(...productOutcomeRoute);
routes.push(...productOverviewRoute);
routes.push(...productOverviewContentRoute);
routes.push(...packageRoute);
routes.push(...orderListRoute);
routes.push(...homeBannerRoute);
routes.push(...courseOverviewRoute);
routes.push(...courseRequirementRoute);
routes.push(...courseCurriculumRoute);
routes.push(...courseDetailsRoute);
routes.push(...TopicOneContentOneRoute);
routes.push(...TopicOneContentTwoRoute);
routes.push(...TopicOneContentThreeRoute);
routes.push(...TopicOneContentFourRoute);
routes.push(...TopicOneContentFiveRoute);
routes.push(...TopicTwoContentOneRoute);
routes.push(...TopicTwoContentTwoRoute);
routes.push(...TopicTwoContentThreeRoute);
routes.push(...TopicTwoContentFourRoute);
routes.push(...TopicTwoContentFiveRoute);
routes.push(...TopicTwoContentSixRoute);
routes.push(...TopicThreeContentOneRoute);
routes.push(...TopicThreeContentTwoRoute);
routes.push(...TopicFourContentOneRoute);
routes.push(...TopicFourContentTwoRoute);
routes.push(...ExtendLearningRoute);
routes.push(...AboutUsRoute);
routes.push(...SiteLogoRoute);
routes.push(...otherRoute);

export default routes;
