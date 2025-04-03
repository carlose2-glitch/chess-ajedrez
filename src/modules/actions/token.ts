import { userApi } from '@/api/apiGame';

export const getToken = async (token: string | null) => {
  try {
    const { data } = await userApi.get(`/token/${token}`);

    return data;
  } catch (error) {
    return error;
  }
};
