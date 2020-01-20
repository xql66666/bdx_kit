import Vue from "vue";
import Router from "vue-router";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: () => import('@/views/Index.vue'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: () => import('@/views/Login'), header: MainNavbar},
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/register",
      name: "register",
      components: { default: () => import('@/views/Register'), header: MainNavbar},
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/info",
      name: "info",
      components: { default: () => import('@/views/Info'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/info/detail/:id",
      name: "infoDetail",
      components: { default: () => import('@/views/info/InfoDetail'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/info/mation",
      name: "infoMation",
      components: { default: () => import('@/views/info/InfoMation'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/info/activity",
      name: "infoActivity",
      components: { default: () => import('@/views/info/InfoActivity'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/info/advise",
      name: "infoAdvise",
      components: { default: () => import('@/views/info/InfoAdvise'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/info/other",
      name: "infoOther",
      components: { default: () => import('@/views/info/InfoOther'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/message",
      name: "message",
      components: { default: () => import('@/views/Message'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/source",
      name: "source",
      components: { default: () => import('@/views/Source'), header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: "/uc",
      name: "uc",
      components: { default: () => import('@/views/uc/profile'), header: MainNavbar, footer: MainFooter},
      props: {
        header: { colorOnScroll: 200 }
      },
      children: [
        {
          path: 'info',
          component: () => import('@/views/uc/info')
        },
        {
          path: 'account',
          component: () => import('@/views/uc/account')
        },
        {
          path: 'mysource',
          component: () => import('@/views/uc/mysource')
        },
        {
          path: 'activity',
          component: () => import('@/views/uc/activity')
        },
        {
          path: 'draw',
          component: () => import('@/views/uc/draw')
        },
        {
          path: 'answer',
          component: () => import('@/views/uc/answer')
        },
      ]
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
