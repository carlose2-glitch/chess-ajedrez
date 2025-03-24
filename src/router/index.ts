import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/game-same-pc',
      name: 'gameSamePc',
      component: () => import('@/modules/views/GameView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/modules/views/HomeView.vue'),
    },
  ],
});

export default router;
