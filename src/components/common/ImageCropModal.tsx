'use client'

import ReactCrop, {
  Crop,
  PercentCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import Modal from '@/components/common/Modal'
import { useState } from 'react'

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface ImageCropModalProps {
  isOpen: boolean
  imageUrl: string
  ratio: number
  onCropModalClose: (newX: number, newY: number) => void
}

function ImageCropModal({
  imageUrl,
  ratio,
  isOpen,
  onCropModalClose,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>()

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (ratio) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, ratio))
    }
  }

  const handleClose = () => {
    const newX =
      completedCrop?.height === 100
        ? (completedCrop.x / (100 - completedCrop.width)) * 100
        : 50
    const newY =
      completedCrop?.width === 100
        ? (completedCrop.y / (100 - completedCrop.height)) * 100
        : 50
    onCropModalClose(newX, newY)
  }

  return (
    <Modal isOpen={isOpen} isBorder={false} onClose={handleClose}>
      <div
        id="cropImageAsset"
        className="max-w-[50vw] max-h-[80vh] overflow-y-auto rounded-2xl"
      >
        <ReactCrop
          crop={crop}
          onChange={(_, c) => setCrop(c)}
          onComplete={(_, c) => setCompletedCrop(c)}
          aspect={ratio}
          locked
        >
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="image_crop"
            onLoad={onImageLoad}
          />
        </ReactCrop>
      </div>
    </Modal>
  )
}

export default ImageCropModal
