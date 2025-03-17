import GameView from '@/modules/views/GameView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Game',
      name: 'game',
      component: GameView,
    },
  ],
});

export default router;
