import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['components/mySongList/mySongList'], resolve)
    },
    {
      path: '/mainPage',
      component: resolve => require(['components/mainPage/mainPage'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['components/mainPage/recommend/recommend'], resolve)
        },
        {
          path: 'recommend',
          component: resolve => require(['components/mainPage/recommend/recommend'], resolve)
        },
        {
          path: 'songList',
          component: resolve => require(['components/mainPage/songList/songList'], resolve)
        },
        {
          path: 'radio',
          component: resolve => require(['components/mainPage/radio/radio'], resolve)
        },
        {
          path: 'rank',
          component: resolve => require(['components/mainPage/rank/rank'], resolve)
        }
      ]
    },
    {
      path: '/mySongList',
      name: 'mySongList',
      component: resolve => require(['components/mySongList/mySongList'], resolve)
    },
    {
      path: '/mySongList/songListDetail',
      name: 'songListDetail',
      component: resolve => require(['components/songListDetail/songListDetail'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['components/search/search'], resolve)
    }
  ],
  linkActiveClass: 'active'
})
