import axios from "@/lib/axios";


export async function danjiFavoriteAdd(data: { pnu: string; realestate_type: number }): Promise<ErrorResponse | null> {
  try {
    return await axios.post('/danji/favorite/add', data);
  } catch (e) {
    return null;
  }
}

export async function danjiFavoriteRemove(data: {
  pnu: string;
  realestate_type: number;
}): Promise<ErrorResponse | null> {
  try {
    return await axios.post('/danji/favorite/remove', data);
  } catch (e) {
    return null;
  }
}
