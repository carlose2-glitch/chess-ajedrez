import { userApi } from '@/api/apiGame';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (login: LoginData) => {
  try {
    const { data } = await userApi.post('login', login);

    return data;
  } catch (error) {
    return error;
  }
};
