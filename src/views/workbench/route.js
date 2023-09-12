const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Index',
  path: '/',
  component: Layout,
  redirect: '/index',
  children: [
    {
      name: 'Index',
      path: 'index',
      component: () => import('./index.vue'),
      meta: {
        title: '首页',
        icon: 'mdi:home',
        order: 0,
        
      },
    },
  ],
}