import axios from 'axios'

const uploadImage = async (file: File) => {
  if (
    !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_URL
  )
    throw new Error('CLOUDINARY environment variable is not set')

  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  )

  try {
    const {
      data: { url },
    } = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, formData)
    return url
  } catch (error) {
    console.error('Image upload failed:', error)
    throw error
  }
}

export default uploadImage
