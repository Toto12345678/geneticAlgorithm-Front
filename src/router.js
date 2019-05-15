import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Diet from './views/Diet.vue'
import GeneticParameters from './views/GeneticParameters.vue'
import AlteredGeneticParameters from './views/AlteredGeneticParameters.vue'
import And from './views/And.vue'
import Xor from './views/Xor.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Diet',
      name: 'diet',
      component: Diet
    },
    {
      path: '/GeneticParameters',
      name: 'GeneticParameters',
      component: GeneticParameters
    },
    {
      path: '/AlteredGeneticParameters',
      name: 'AlteredGeneticParameters',
      component: AlteredGeneticParameters
    },
    {
      path: '/And',
      name: 'And',
      component: And
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
