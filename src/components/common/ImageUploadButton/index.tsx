import { useRef } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import useImageUpload from '@/hooks/useImageUpload'

interface ImageUploadButtonProps {
  onClick?: () => void
  onUpload: (imageUrl: string) => void
}

function ImageUploadButton({ onClick, onUpload }: ImageUploadButtonProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const { uploadImage } = useImageUpload()

  const handleClickInputRef = () => {
    if (onClick) {
      onClick()
    }
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = await uploadImage(e.target.files, 'asset')
    if (!imageUrl) return
    onUpload(imageUrl)
  }

  return (
    <>
      <button
        type="button"
        aria-label="change-image"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        onClick={handleClickInputRef}
      >
        <TbPhotoPlus size={24} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        className="hidden"
        onChange={handleUploadImage}
      />
    </>
  )
}

export default ImageUploadButton
