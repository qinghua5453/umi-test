import { defineConfig } from 'umi';
const path = require('path');
const resolve = (dir:any) => path.resolve(__dirname, dir);

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@components': '@/components',
    '@service': '@/service',
  },
  // routes: [
  //   {
  //     path: '/',
  //     component: '@/layout',
  //     routes: [
  //       {
  //         path: '/workCenter',
  //         component: '@/pages/workCenter/layout/index',
  //         routes: [
  //           { path: '/workCenter/list', component: '@/pages/workCenter/list/index' }
  //         ]
  //       },
  //     ]
  //   }
  // ],
  fastRefresh: {},
});
