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
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/views/LoginView.vue'),
        },
        {
          path: 'sing',
          name: 'sing',
          component: () => import('@/modules/views/CreateAccount.vue'),
        },
      ],
    },
  ],
});

export default router;
