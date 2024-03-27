import httpClient from './httpClient'

const uploadImage = async (
  files: FileList | null,
  type: 'thumbnail' | 'asset',
) => {
  if (!files || !files[0])
    throw new Error('CLOUDINARY environment variable is not set')

  const file = files[0]
  const formData = new FormData()
  formData.append('file', file)

  try {
    const {
      data: { imageUrl },
    } = await httpClient.post(`/v1/image/upload/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return imageUrl
  } catch (error) {
    console.error('Image upload failed:', error)
    throw error
  }
}

export default uploadImage
