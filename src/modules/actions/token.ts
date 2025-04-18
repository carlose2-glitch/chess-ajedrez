import { userApi } from '@/api/apiGame';

export const getToken = async (token: string | null) => {
  try {
    const { data } = await userApi.get(`/token/${token}`);

    return data;
  } catch (error) {
    return error;
  }
};

export const deaperture = async (tokenUser: string | null, token: string | string[]) => {
  try {
    const { data } = await userApi.post(`/token/deaperture`, {
      tokenUser: tokenUser,
      tokenDe: token,
    });
    return data;
  } catch (error) {
    return error;
  }
};
