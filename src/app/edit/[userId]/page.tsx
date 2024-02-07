/* eslint-disable @next/next/no-img-element */

'use client'

import 'react-grid-layout/css/styles.css'
import Toolbar from '@/components/Toolbar'
import { DetailType, ToolType } from '@/types'
import React, { useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import { FaAngleRight } from 'react-icons/fa6'
import GridItem from '@/components/GridItem'

type UserData = {
  id: string
  name: string
  bio: string
  thumbnail: string
  details: DetailType[]
}
const PREVENT_DRAG_DEFAULTS = ['.resize-handler', '.detail-toolbar']
const USERDATA: UserData = {
  id: '1',
  name: '소르비',
  bio: '❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다.',
  thumbnail: 'https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg',
  details: [
    {
      id: '123',
      type: 'image',
      value: {
        imageUrl: 'https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg',
      },
    },
    {
      id: '1223',
      type: 'image',
      value: {
        imageUrl:
          'https://res.cloudinary.com/dkxn96rs9/image/upload/v1707230068/jpjtwqkxs5dcmoket5wr.png',
      },
    },
  ],
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const ResizeHandler = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bottom-1 right-1 cursor-se-resize resize-handler"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <FaAngleRight size="24" className="text-gray-200 rotate-45" />
    </div>
  )
})

export default function UserPage({ params }: { params: { userId: string } }) {
  const [data, setData] = useState<UserData>(USERDATA)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })
  const [rowHeight, setRowHeight] = useState(168)
  const handleAdd = (name: ToolType, value?: string) => {
    const id = uuidv4()

    setData({
      ...data,
      details: [
        ...data.details,
        {
          id,
          type: name,
          value,
        },
      ],
    })
  }

  const handleDelete = (id: string) => {
    setData({
      ...data,
      details: data.details.filter((detail) => detail.id !== id),
    })

    setLayouts({
      lg: layouts?.lg.filter((layout) => layout.i !== id),
      sm: layouts?.sm.filter((layout) => layout.i !== id),
      xxs: layouts?.xxs.filter((layout) => layout.i !== id),
    })
  }
  console.log(params.userId)

  return (
    <div className="relative">
      <Toolbar onAdd={handleAdd} />
      <div className="flex">
        <div className="flex w-full md:flex-row flex-col">
          <div className="flex flex-col gap-8 px-8 py-16 w-80">
            <button type="button">
              {data.thumbnail ? (
                <img
                  className="rounded-full w-48 h-48"
                  src={data.thumbnail}
                  alt="프로필 이미지"
                />
              ) : (
                <img
                  className="rounded-full w-48 h-48"
                  src="https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg"
                  alt="프로필 이미지"
                />
              )}
            </button>
            <div className="flex flex-col gap-4">
              <h1
                className="break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {data.name}
              </h1>
              <h3
                className="text-gray-500 break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {data.bio}
              </h3>
            </div>
          </div>
          <div className="w-full max-w-screen-xl px-8 py-16">
            <ResponsiveGridLayout
              breakpoints={{ lg: 769, md: 768 }}
              cols={{ lg: 6, md: 2 }}
              rowHeight={rowHeight}
              layouts={layouts}
              verticalCompact
              compactType={null}
              draggableCancel={PREVENT_DRAG_DEFAULTS.join(',')}
              resizeHandle={<ResizeHandler />}
              onLayoutChange={(_, currentLayout) => {
                setLayouts(currentLayout)
              }}
              onWidthChange={(wid, _, cols) => {
                setRowHeight((wid * 1) / cols)
              }}
            >
              {data.details.map((detail) => (
                <div key={detail.id} className="flex">
                  <GridItem
                    detail={detail}
                    key={detail.id}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-red-100 h-40"
        onClick={() => console.log('data', data, 'layouts', layouts)}
      >
        저장하기
      </button>
    </div>
  )
}
