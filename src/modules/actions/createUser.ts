import { userApi } from '@/api/apiGame';
import type { User } from '../interfaces/createUser/createUser';

export const createUserApi = async (create: User) => {
  try {
    const { data } = await userApi.post('/sing/create', create);

    return data;
  } catch (error) {
    return error;
  }
};
