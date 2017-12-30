import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/mainPage/recommend/recommend'
import songList from 'components/mainPage/songList/songList'
import radio from 'components/mainPage/radio/radio'
import rank from 'components/mainPage/rank/rank'
import mainPage from 'components/mainPage/mainPage'
import mySongList from 'components/mySongList/mySongList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: mainPage
    },
    {
      path: '/mainPage',
      component: mainPage,
      children: [
        {
          path: '',
          component: recommend
        },
        {
          path: 'recommend',
          component: recommend
        },
        {
          path: 'songList',
          component: songList
        },
        {
          path: 'radio',
          component: radio
        },
        {
          path: 'rank',
          component: rank
        }
      ]
    },
    {
      path: '/mySongList',
      component: mySongList
    }
  ],
  linkActiveClass: 'active'
})
