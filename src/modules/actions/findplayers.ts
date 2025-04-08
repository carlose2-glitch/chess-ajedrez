import { userApi } from '@/api/apiGame';

export const findPlayers = async (name: string) => {
  try {
    const { data } = await userApi.get(`/users/all/${name}`);
    return data;
  } catch (error) {
    return error;
  }
};
