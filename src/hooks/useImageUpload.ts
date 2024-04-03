import httpClient from '@/lib/httpClient'
import { useSetRecoilState } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'

const useImageUpload = () => {
  const setProgressBar = useSetRecoilState(progressBarState)

  const uploadImage = async (
    files: FileList | null,
    type: 'thumbnail' | 'asset',
  ) => {
    if (!files || !files[0])
      throw new Error('CLOUDINARY environment variable is not set')

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    setProgressBar((prev) => ({
      ...prev,
      isLoading: true,
    }))

    try {
      const {
        data: { imageUrl },
      } = await httpClient.post(`/v1/image/upload/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent

          if (!total) return
          const percentage = Math.floor((loaded / total) * 100)
          setProgressBar((prev) => ({
            ...prev,
            percent: percentage,
          }))
        },
      })

      setProgressBar({
        percent: 0,
        isLoading: false,
      })

      return imageUrl
    } catch (error) {
      console.error('Image upload failed:', error)
      throw error
    }
  }

  return { uploadImage }
}

export default useImageUpload
