// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    // meta: { title: 'menu.home' }, // 更换语言in18
    meta: { title: '主页' },
    // redirect: '/dashboard/workplace',
    redirect: '/zjEmail/tgList/table-list',
    children: [
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
      //     },
      //     // 外部链接
      //     {
      //       path: 'https://www.baidu.com/',
      //       name: 'Monitor',
      //       meta: { title: 'menu.dashboard.monitor', target: '_blank' }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
      //     }
      //   ]
      // },
      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
      //     }
      //   ]
      // },
      // list
      {
        path: '/list',
        name: 'tgList',
        component: RouteView,
        // redirect: '/zjEmail/tgList/table-list',
        redirect: '/list/table-list/tg/01',
        // meta: { title: 'menu.list', icon: 'table', permission: ['table'] }, // 更换语言in18
        meta: { title: '托管组邮件规则管理', icon: 'form' },
        children: [
          {
            // path: '/list/table-list',
            path: '/list/table-list/:groupCode/:bizCode',
            name: 'TGTableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/zjEmail/tgList/TGTableList01'),
            meta: { title: '交易文件规则', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list/groupCode=tg&bizCode=02',
            name: 'TGBasicList',
            component: () => import('@/views/zjEmail/tgList/TGBasicList02'),
            // component: () => import('@/views/list/TableList'),
            meta: { title: '对账单文件规则', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list/groupCode=tg&bizCode=03?',
            name: 'TGBasicListBizCode02',
            component: () => import('@/views/zjEmail/tgList/TGReaptEmialList03'),
            // component: () => import('@/views/list/TableList'),
            meta: { title: '重复交易文件/对账单', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/wbList',
        name: 'wbList',
        component: RouteView,
        redirect: '/list/table-list',
        // meta: { title: 'menu.list', icon: 'table', permission: ['table'] }, // 更换语言in18
        meta: { title: '外包交易文件规则', icon: 'form' },
        children: [
          {
            path: '/list/table-list/groupCode=wb&bizCode=01?',
            name: 'WBTableListWrapperBizCode01',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/zjEmail/wbList/WBTableList01'),
            meta: { title: '交易文件规则', keepAlive: true }
          },
          {
            path: '/list/basic-list/groupCode=wb&bizCode=02',
            name: 'WBBasicList',
            component: () => import('@/views/zjEmail/wbList/WBBasicList02'),
            // component: () => import('@/views/list/TableList'),
            meta: { title: '对账单文件规则', keepAlive: true }
          },
          {
            path: '/list/basic-list/groupCode=wb&bizCode=03',
            name: 'WBBasicListBizCode02',
            component: () => import('@/views/zjEmail/wbList/WBReaptEmialList03'),
            // component: () => import('@/views/list/TableList'),
            meta: { title: '重复交易文件/对账单', keepAlive: true }
          }
        ]
      },
      {
        path: '/ywglList',
        name: 'ywglList',
        component: RouteView,
        redirect: '/list/table-list',
        // meta: { title: 'menu.list', icon: 'table', permission: ['table'] }, // 更换语言in18
        meta: { title: '业务规制管理', icon: 'form' },
        children: [
          {
            path: '/list/table-list/ywgl=ywgl?',
            name: 'TableListWrapperYwgl',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/zjEmail/ywglList/YWGLTableList'),
            meta: { title: '估值时效配置', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/yjglList',
        name: 'yjglList',
        component: RouteView,
        redirect: '/list/table-list',
        // meta: { title: 'menu.list', icon: 'table', permission: ['table'] }, // 更换语言in18
        meta: { title: '邮件管理', icon: 'form' },
        children: [
          {
            path: '/list/table-list/yjgl=yxgl?',
            name: 'TableListWrapperYjgl',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/zjEmail/yjglList/YjglTableList01'),
            meta: { title: '邮箱管理', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list/yjgl=yxbdyw?',
            name: 'BasicListYjgl',
            component: () => import('@/views/zjEmail/yjglList/YjglBasicList02'),
            // component: () => import('@/views/list/TableList'),
            meta: { title: '邮箱绑定业务', keepAlive: true, permission: ['table'] }
          }
        ]
      }
      // zj邮件规则配置
      // {
      //   path: '/zjlist',
      //   name: 'zjlist',
      //   component: RouteView,
      //   redirect: '/zjlist/table-list',
      //   meta: { title: 'menu.zj.list', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/zjlist/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/zjlist/TableList'),
      //       meta: { title: 'menu.zj.list.table-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/zjlist/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/zjlist/BasicList'),
      //       meta: { title: 'menu.zj.list.basic-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/zjlist/card',
      //       name: 'CardList',
      //       component: () => import('@/views/zjlist/CardList'),
      //       meta: { title: 'menu.zj.list.card-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/zjlist/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/zjlist/search/SearchLayout'),
      //       redirect: '/zjlist/search/article',
      //       meta: { title: 'menu.zj.list.search-list', keepAlive: true, permission: ['table'] },
      //       children: [
      //         {
      //           path: '/zjlist/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/zjlist/search/Article'),
      //           meta: { title: 'menu.zj.list.search-list.articles', permission: ['table'] }
      //         },
      //         {
      //           path: '/zjlist/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/zjlist/search/Projects'),
      //           meta: { title: 'menu.zj.list.search-list.projects', permission: ['table'] }
      //         },
      //         {
      //           path: '/zjlist/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/zjlist/search/Applications'),
      //           meta: { title: 'menu.zj.list.search-list.applications', permission: ['table'] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: 'menu.profile.basic', permission: ['profile'] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: 'menu.profile.advanced', permission: ['profile'] }
      //     }
      //   ]
      // },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/basic',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/basic',
      //           name: 'BasicSettings',
      //           component: () => import('@/views/account/settings/BasicSetting'),
      //           meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: {
      //             title: 'account.settings.menuMap.security',
      //             hidden: true,
      //             keepAlive: true,
      //             permission: ['user']
      //           }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: {
      //             title: 'account.settings.menuMap.notification',
      //             hidden: true,
      //             keepAlive: true,
      //             permission: ['user']
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
