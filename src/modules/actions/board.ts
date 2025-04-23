import { userApi } from '@/api/apiGame';

export const board = async (id: string | string[], token: string | null) => {
  try {
    const { data } = await userApi.post(`board`, { id: id, token: token });

    return data;
  } catch (error) {
    return error;
  }
};
