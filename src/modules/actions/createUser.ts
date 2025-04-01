import { userApi } from '@/api/apiGame';
import type { User } from '../interfaces/createUser/createUser';

export const createUserApi = async (create: User) => {
  try {
    const { data } = await userApi.post('/sing/create', create);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
