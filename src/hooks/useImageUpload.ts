import httpClient from '@/lib/httpClient'
import { useSetRecoilState } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'

const useImageUpload = () => {
  const setIsLoading = useSetRecoilState(progressBarState)

  const uploadImage = async (
    files: FileList | null,
    type: 'thumbnail' | 'asset',
  ) => {
    if (!files || !files[0]) return undefined

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    setIsLoading(true)

    try {
      const {
        data: { imageUrl },
      } = await httpClient.post(`/v1/image/upload/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return imageUrl
    } catch (error) {
      console.error('Image upload failed:', error)
      throw error
    }
  }

  return { uploadImage }
}

export default useImageUpload
