import { userApi } from '@/api/apiGame';

export const winerPlayer = async (name: string, id: number, color: string | null) => {
  try {
    const { data } = await userApi.post('/board/winer', { name: name, id: id, color: color });
    return data;
  } catch (error) {
    return error;
  }
};
