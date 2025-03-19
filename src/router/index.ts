import HomeView from '@/modules/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Game',
      name: 'Game',
      component: () => import('@/modules/views/GameView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
