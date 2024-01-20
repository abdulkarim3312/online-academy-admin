import * as VueRouter from 'vue-router';
import routes from './routes';
import middlewarePipeline from "../middlewares/middlewarePipeline";
import store from '../store';
// import { i18n } from '../main'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.VUE_APP_BASE),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  // i18n.locale = localStorage.getItem('language') || 'en'

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
});

export default router;