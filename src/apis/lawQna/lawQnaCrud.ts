import axios from '@/lib/axios';

interface CreateRequest {
  title: string;
  user_message: string;
}

interface UpdateRequest {
  law_qna_id: number;
  title: string;
  user_message: string;
}

interface DeleteRequest {
  law_qna_id: number;
}

export async function lawQnaCreate(req: CreateRequest) {
  try {
    const { data } = await axios.post('/lawqna/create', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function lawQnaUpdate(req: UpdateRequest) {
  try {
    const { data } = await axios.post('/lawqna/update', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function lawQnaDelete(req: DeleteRequest) {
  try {
    const { data } = await axios.post('/lawqna/delete', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}
