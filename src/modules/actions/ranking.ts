import { userApi } from '@/api/apiGame';

export const getRanking = async () => {
  try {
    const { data } = await userApi.get('board/ranking');
    return data;
  } catch (error) {
    return error;
  }
};
