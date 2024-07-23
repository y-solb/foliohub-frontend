import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Image from 'next/image'
import ImageCropModal from '.'

const meta: Meta<typeof ImageCropModal> = {
  title: 'Modal/ImageCropModal',
  component: ImageCropModal,
  parameters: {
    docs: {
      subtitle: 'ImageCropModal는 이미지를 자를 수 있는 Modal 컴포넌트입니다.',
    },
  },
  argTypes: {
    isOpen: {
      description: '모달의 열림/닫힘 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
      },
      control: { disable: true },
    },
    imageUrl: {
      description: '이미지의 URL을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    ratio: {
      description: '이미지의 비율을 설정합니다.',
      table: {
        type: { summary: 'number' },
      },
    },
    onCropModalClose: {
      description:
        '모달이 닫힐 때 호출되는 함수로 새로운 x와 y 위치를 전달받습니다',
      table: {
        type: { summary: '(newX: number, newY: number) => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ImageCropModal>

export const Default: Story = {
  args: {
    imageUrl:
      'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
    ratio: 2 / 1,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    const handleCropModalClose = (newX: number, newY: number) => {
      setIsOpen(false)
      setPos({ x: newX, y: newY })
    }

    const paddingBottom = `${(1 / args.ratio) * 100}%`

    return (
      <>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          Open ImageCropModal
        </button>
        <div className="relative w-full" style={{ paddingBottom }}>
          <Image
            src={args.imageUrl}
            className="object-cover"
            alt="image"
            style={{
              objectPosition: `${pos ? pos.x : 50}% ${pos ? pos.y : 50}%`,
            }}
            quality={100}
            fill
            priority
            sizes="(max-width: 842px) 100vw, 80vw"
          />
        </div>
        <ImageCropModal
          isOpen={isOpen}
          imageUrl={args.imageUrl}
          ratio={args.ratio}
          onCropModalClose={(newX, newY) => {
            handleCropModalClose(newX, newY)
          }}
        />
      </>
    )
  },
}
