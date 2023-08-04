import axios from '@/lib/axios';

export interface UploadDocumentResponse {
  full_file_paths: string[];
}

export default async function uploadPhotos(file: File): Promise<UploadDocumentResponse | null> {
  const formData = new FormData();
  formData.append('files', file);
  try {
    const { data } = await axios.post('/chat/upload/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data as UploadDocumentResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
