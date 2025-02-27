import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import FormProductView from '@/views/FormProductView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      children: [
        { path: '', component: ProductsView },
        { path: 'detail/:id?', component: ProductView },
        { path: 'form/:id', component: FormProductView },
      ],
    },
  ],
})

export default router
