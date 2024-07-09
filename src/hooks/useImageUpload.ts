import { useSetRecoilState } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'
import { uploaderImage } from '@/services/image'

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
      const result = await uploaderImage({ type, formData })
      return result
    } catch (error) {
      console.error('Image upload failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { uploadImage }
}

export default useImageUpload
