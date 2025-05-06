import { isAuthenticatedGuard } from '@/guards/isAuthenticated.guards';
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
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/views/LoginView.vue'),
        },
        {
          path: 'sing',
          name: 'sing',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/views/CreateAccount.vue'),
        },
      ],
    },
    {
      path: '/online',
      name: 'online',
      component: () => import('@/modules/views/GameOnline.vue'),
    },
    {
      path: '/game/:token',
      name: 'matchGame',
      component: () => import('@/modules/views/GameMatch.vue'),
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/modules/views/RankingView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/modules/views/NotFound.vue'),
    },
  ],
});

export default router;
