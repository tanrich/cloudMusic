import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import songList from 'components/songList/songList'
import radio from 'components/radio/radio'
import rank from 'components/rank/rank'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: recommend
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/songList',
      component: songList
    },
    {
      path: '/radio',
      component: radio
    },
    {
      path: '/rank',
      component: rank
    }
  ],
  linkActiveClass: 'active'
})
