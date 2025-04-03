import { getToken } from '@/modules/actions/token';

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem('token-chess');

  const data = await getToken(token);

  if (data.data !== 'iniciar sesion') {
    return next({ path: '/' });
  } else {
    return next();
  }
};
