const Layout = () => import('@/layout/index.vue')
export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
    {
      name: 'LOGIN',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      isHidden: true,
      meta: {
        title: '登录页',
      },
    },
  
    {
      name: 'ExternalLink',
      path: '/external-link',
      component: Layout,
      isHidden: true,
      meta: {
        title: '外部链接',
        icon: 'mdi:link-variant',
        order: 4,
      },
      children: [
        {
          name: 'LinkGithubSrc',
          path: 'https://github.com/zclzone/vue-naive-admin',
          meta: {
            title: '源码 - github',
            icon: 'mdi:github',
          },
        },
        {
          name: 'LinkGiteeSrc',
          path: 'https://gitee.com/zclzone/vue-naive-admin',
          meta: {
            title: '源码 - gitee',
            icon: 'simple-icons:gitee',
          },
        },
        {
          name: 'LinkDocs',
          path: 'https://zclzone.github.io/vue-naive-admin-docs',
          meta: {
            title: '文档 - vuepress',
            icon: 'mdi:vuejs',
          },
        },
      ],
    },
  ]
  
  export const NOT_FOUND_ROUTE = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    isHidden: true,
  }
  export const EMPTY_ROUTE = {
    name: 'Empty',
    path: '/:pathMatch(.*)*',
    component: null,
  }
  // 匹配views文件中route.js的路由都会作为动态路由
  const modules = import.meta.glob('@/views/**/route.js', { eager: true })
  const asyncRoutes = []
  // Object.keys返回可枚举的属性数组
  Object.keys(modules).forEach((key) => {
    asyncRoutes.push(modules[key].default)
  })
  
  export { asyncRoutes }
  