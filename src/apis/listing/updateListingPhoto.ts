import axios from '@/lib/axios';

export interface UploadDocumentResponse extends ErrorResponse {
  document_id: number;
}

export default async function uploadListingPhoto(
  listingID: number,
  file: File,
): Promise<UploadDocumentResponse | null> {
  const formData = new FormData();
  formData.append('listing_id', `${listingID}`);
  formData.append('files', file);
  try {
    return await axios.post('/listing/upload/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (e) {
    return null;
  }
}
