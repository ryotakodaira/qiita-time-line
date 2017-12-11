import Vue from 'vue'
import Router from 'vue-router'
import QiitaTimeLine from '@/components/QiitaTimeLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QiitaTimeLine',
      component: QiitaTimeLine
    }
  ]
})
