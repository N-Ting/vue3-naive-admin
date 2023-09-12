const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/crud',
  meta: {
    title: '系统管理',
    customIcon: 'logo',
    // role: ['admin'],
    requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'Crud',
      path: 'crud',
      component: () => import('./table/index.vue'),
      meta: {
        title: '企业管理',
        icon: 'ic:baseline-table-view',
        // role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'MDEditor',
      path: 'md-editor',
      component: () => import('./editor/md-editor.vue'),
      meta: {
        title: '用户管理',
        icon: 'ri:markdown-line',
        // role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'RichTextEditor',
      path: 'rich-text',
      component: () => import('./editor/rich-text.vue'),
      meta: {
        title: '角色管理',
        icon: 'ic:sharp-text-rotation-none',
        // role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Upload',
      path: 'upload',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '部门管理',
        icon: 'mdi:upload',
        // role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
