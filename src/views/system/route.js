const Layout = () => import('@/layout/index.vue')

export default {
  name: 'System',
  path: '/system',
  component: Layout,
  redirect: '/system/units',
  meta: {
    title: '系统管理',
    icon: 'material-symbols:settings-outline-rounded',
    // role: ['admin'],
    // requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'Units',
      path: 'units',
      component: () => import('./table/index.vue'),
      meta: {
        title: '企业管理',
        icon: 'carbon:enterprise',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Users',
      path: 'users',
      component: () => import('./roles/md-editor.vue'),
      meta: {
        title: '用户管理',
        icon: 'material-symbols:person',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Roles',
      path: 'roles',
      component: () => import('./roles/rolesMange.vue'),
      meta: {
        title: '角色管理',
        icon: 'carbon:user-role',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Depts',
      path: 'depts',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '部门管理',
        icon: 'mingcute:department-line',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Menus',
      path: 'menus',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'gridicons:menus',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Areas',
      path: 'areas',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '地区管理',
        icon: 'iconoir:area-search',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Logs',
      path: 'logs',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '日志管理',
        icon: 'iconoir:journal',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'Files',
      path: 'files',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '文件管理',
        icon: 'solar:folder-with-files-bold',
        // role: ['admin'],
        // requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
