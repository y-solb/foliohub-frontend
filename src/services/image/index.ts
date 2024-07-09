import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { UploadImagePayload, UploadImageResponse } from './type'

export const uploaderImage = async ({ type, formData }: UploadImagePayload) => {
  const {
    data: { imageUrl },
  } = await httpClient.post<UploadImageResponse>(
    API_ENDPOINTS.IMAGEUPLOAD(type),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return imageUrl
}
