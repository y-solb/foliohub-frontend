import { LuImagePlus } from 'react-icons/lu'
import { useRef } from 'react'
import uploadImage from '@/lib/uploadImage'

interface ImageUploadButtonProps {
  onUpload: (imageUrl: string) => void
}

function ImageUploadButton({ onUpload }: ImageUploadButtonProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (file) {
      const imageUrl = await uploadImage(file)
      onUpload(imageUrl)
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="change-image"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        onClick={handleClickInputRef}
      >
        <LuImagePlus size={24} />
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
