import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import songList from 'components/songList/songList'
import radio from 'components/radio/radio'
import rank from 'components/rank/rank'
import mainPage from 'components/mainPage/mainPage'
import myList from 'components/myList/myList'

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
          component: songList
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
      path: 'myList',
      component: myList
    }
  ],
  linkActiveClass: 'active'
})
