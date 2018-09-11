import Vue from 'vue'
import Router from 'vue-router'
import ManifestDesigner from '@/components/ManifestDesigner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ManifestDesigner',
      component: ManifestDesigner
    }
  ]
})
