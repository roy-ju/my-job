import axios from '@/lib/axios';

interface uploadProfileImageResponse {
  full_file_paths: string[];
}

export default async function uploadProfileImage(userID: number, file: File) {
  const formData = new FormData();
  formData.append('user_id', `${userID}`);
  formData.append('files', file);
  try {
    const { data } = await axios.post<uploadProfileImageResponse>('my/upload/profileimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data as uploadProfileImageResponse;
  } catch (e) {
    return null;
  }
}
