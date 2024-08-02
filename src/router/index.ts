import { route } from 'quasar/wrappers';
import store from '@/store';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        //document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        //if (to.query.page) return;
        return new Promise((resolve) => {
          resolve({ left: 0, top: 0 });
        });
      }
    },
    routes,
    linkActiveClass: 'is-subactive',
    linkExactActiveClass: 'is-active',

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    // console.log(process.env.SERVER);
    //уточнить зачем нужен process.env.SERVER
    if (to.meta.isAuth && !process.env.SERVER) {
      if (store.state.user) {
        next();
      } else {
        next({ name: 'home' });
      }
    } else {
      next();
    }
  });

  Router.afterEach((to, from) => {
    if (to.name !== from.name && to.name === 'page404' && from.name) {
      if (!process.env.SERVER) window.history.replaceState({}, null, from.path);
    }
  });

  return Router;
});
