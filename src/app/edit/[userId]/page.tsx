/* eslint-disable @next/next/no-img-element */

'use client'

import 'react-grid-layout/css/styles.css'
import Toolbar from '@/components/Toolbar'
import { DetailType, ToolType } from '@/types'
import React, { useEffect, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import { FaAngleRight } from 'react-icons/fa6'
import GridItem from '@/components/GridItem'

const LG_BREAKPOINT = 769
const MD_BREAKPOINT = 768

type UserData = {
  id: string
  name: string
  bio: string
  thumbnail: string
  details: DetailType[]
}

const PREVENT_DRAG_DEFAULTS = [
  '.resize-handler',
  '.detail-toolbar',
  '.image-link',
]
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
    {
      id: '1224',
      type: 'github',
      value: {
        githubId: 'y-solb',
      },
    },
  ],
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const ResizeHandler = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="resize-handler absolute bottom-1 right-1 cursor-se-resize"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <FaAngleRight size="24" className="text-gray-200 rotate-45" />
    </div>
  )
})

export default function EditPage({ params }: { params: { userId: string } }) {
  const [data, setData] = useState<UserData>(USERDATA)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })
  const [breakpoint, setBreakpoint] = useState('')
  const [rowHeight, setRowHeight] = useState(168) // TODO: 처음에 렌더링 시 계산되도록 변경 필요
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const windowWidth = window.innerWidth

    if (windowWidth >= LG_BREAKPOINT) {
      setBreakpoint('lg')
    } else if (windowWidth >= MD_BREAKPOINT) {
      setBreakpoint('md')
    }
  }, [])

  // TODO name을 type으로 변경하기
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
    if (name === 'github') {
      setLayouts({
        ...layouts,
        [breakpoint]: [
          ...layouts[breakpoint],
          {
            i: id,
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            maxH: 1,
          },
        ],
      })
    }
  }

  const handleUpdate = (updatedDetail: DetailType) => {
    setData({
      ...data,
      details: data.details.map((detail) =>
        detail.id === updatedDetail.id ? updatedDetail : detail,
      ),
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
              breakpoints={{ lg: LG_BREAKPOINT, md: MD_BREAKPOINT }}
              cols={{ lg: 6, md: 2 }}
              rowHeight={rowHeight}
              layouts={layouts}
              verticalCompact
              compactType={null}
              isDraggable={!isEditMode}
              draggableCancel={PREVENT_DRAG_DEFAULTS.join(',')}
              resizeHandle={<ResizeHandler />}
              onBreakpointChange={(newBreakpoint) => {
                setBreakpoint(newBreakpoint)
              }}
              onLayoutChange={(_, currentLayout) => {
                setLayouts(currentLayout)
              }}
              onWidthChange={(width, margin, cols) => {
                setRowHeight((width - (cols + 1) * margin[0]) / cols)
              }}
            >
              {data.details.map((detail) => (
                <div key={detail.id} className="flex">
                  <GridItem
                    detail={detail}
                    layout={layouts[breakpoint]?.find(
                      (layout) => layout.i === detail.id,
                    )}
                    key={detail.id}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onChangeEditMode={() => setIsEditMode((pre) => !pre)}
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
