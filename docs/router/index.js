import Vue from "vue";
import Router from "vue-router";
import NavConfig from "./nav.config.yml";

Vue.use(Router);

function regeisterRoute(navConfig) {
  const routes = [];
  const parentRoutes = {};

  Object.keys(NavConfig).forEach((lang, idx) => {
    const pageNavs = NavConfig[lang];
    //console.log(pageNavs)
    for (const pageName in pageNavs) {
      pageNavs[pageName].forEach(nav => {
        const parentName = nav.name;
        parentRoutes[`${parentName}-${lang}`] =
          parentRoutes[`${parentName}-${lang}`] ||
          addParentRoute(parentName, lang);

        if (nav.groups) {
          nav.groups.forEach(group => {
            group.items.forEach(item => {
              addRoute(parentName, item, lang);
            });
          });
        } else if (nav.items) {
          nav.items.forEach(item => {
            addRoute(parentName, item, lang);
          });
        }
      });
    }
  });

  function addParentRoute(parentName, lang) {
    return {
      path: `/${lang}/${parentName.toLowerCase()}`,
      component: resolve =>
        require([`../views/${parentName.toLowerCase()}.vue`], resolve),
      children: []
    };
  }

  function addRoute(parentName, item, lang) {
    parentRoutes[`${parentName}-${lang}`].children.push({
      path: `${item.name.toLowerCase()}`,
      name: `${item.name}-${lang}`,
      meta: {
        title: `${item.title}`,
        // notab: item.notab ? item.notab : false,
        keepAlive: item.keepAlive ? item.keepAlive : false
      },
      component: resolve =>
        require([`../markdown/zh/${item.name.toLowerCase()}.md`], resolve)
    });
  }

  for (const key in parentRoutes) {
    if (parentRoutes.hasOwnProperty(key)) {
      routes.push(parentRoutes[key]);
    }
  }

  return routes;
}

let routes = regeisterRoute(NavConfig);

routes.forEach(page => {
  if (page.path === "/zh/guide") {
    page.children.push({
      path: "",
      name: "Guide",
      redirect: { name: page.children[0].name }
    });
  } else if (page.path === "/zh/docs") {
    page.children.push({
      path: "",
      name: "Docs",
      redirect: { name: page.children[0].name }
    });
  }
  if (page.path === "/zh/resource") {
    page.children.push({
      path: "",
      name: "Resource",
      redirect: { name: page.children[0].name }
    });
  }
});
routes = routes.concat([
  {
    path: "/",
    component: resolve => require(["../views/index"], resolve)
  },
  {
    path: "/test",
    component: resolve => require(["../markdown/test"], resolve)
  }
]);

const router = new Router({
  routes
});

export default router;
