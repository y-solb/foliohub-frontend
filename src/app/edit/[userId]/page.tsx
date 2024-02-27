/* eslint-disable @next/next/no-img-element */

'use client'

import 'react-grid-layout/css/styles.css'
import Toolbar from '@/components/toolbar/Toolbar'
import { AssetType, ToolType } from '@/types'
import React, { useEffect, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import GridItem from '@/components/grid/GridItem'
import {
  usePortfolioMutation,
  usePortfolioQuery,
} from '@/hooks/queries/portfolio'
import ResizeHandler from '@/components/grid/ResizeHandler'

const LG_BREAKPOINT = 842
const MD_BREAKPOINT = 841

type UserData = {
  id: string
  displayName: string
  shortBio: string
  thumbnail: string
  assets: AssetType[]
}

const PREVENT_DRAG_DEFAULTS = [
  '.resize-handler',
  '.control-wrapper',
  '.image-link',
]

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function EditPage({ params }: { params: { userId: string } }) {
  const { data, isLoading } = usePortfolioQuery(params.userId)
  const [portfolio, setPortfolio] = useState<UserData | null>(null)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })
  const [breakpoint, setBreakpoint] = useState('')
  const [rowHeight, setRowHeight] = useState(168) // TODO: 처음에 렌더링 시 계산되도록 변경 필요
  const [isEditMode, setIsEditMode] = useState(false)
  const { mutate } = usePortfolioMutation()

  useEffect(() => {
    const windowWidth = window.innerWidth

    if (windowWidth >= LG_BREAKPOINT) {
      setBreakpoint('lg')
    } else if (windowWidth >= MD_BREAKPOINT) {
      setBreakpoint('md')
    }
  }, [])

  useEffect(() => {
    if (data) {
      const { id, displayName, shortBio, thumbnail, assets, layout } = data
      setPortfolio({ id, displayName, shortBio, thumbnail, assets })
      setLayouts(layout)
    }
  }, [data])

  if (isLoading || !portfolio) {
    return null
  }

  // TODO name을 type으로 변경하기
  const handleAdd = (name: ToolType, value?: string) => {
    const id = uuidv4()

    setPortfolio({
      ...portfolio,
      assets: [
        ...portfolio.assets,
        {
          id,
          type: name,
          command: 'save',
          value,
        },
      ],
    })
    if (name === 'github') {
      setLayouts({
        lg: [
          ...layouts.lg,
          {
            i: id,
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            maxH: 1,
          },
        ],
        md: [
          ...layouts.md,
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

  const handleUpdate = (updatedAsset: AssetType) => {
    setPortfolio({
      ...portfolio,
      assets: portfolio.assets.map((asset) =>
        asset.id === updatedAsset.id
          ? {
              ...updatedAsset,
              command: updatedAsset.command ? updatedAsset.command : 'update',
            }
          : asset,
      ),
    })
  }

  const handleDelete = (id: string) => {
    setPortfolio({
      ...portfolio,
      assets: portfolio.assets.filter((asset) => asset.id !== id),
    })

    setLayouts({
      lg: layouts?.lg.filter((layout) => layout.i !== id),
      md: layouts?.md.filter((layout) => layout.i !== id),
    })
  }

  return (
    <div className="relative">
      <Toolbar onAdd={handleAdd} />
      <div className="flex">
        <div className="flex w-full md:flex-row flex-col">
          <div className="flex flex-col gap-8 px-8 py-16 w-80">
            <button type="button">
              {portfolio.thumbnail ? (
                <img
                  className="rounded-full w-48 h-48"
                  src={portfolio.thumbnail}
                  alt="프로필 이미지"
                />
              ) : (
                <img
                  className="rounded-full w-48 h-48"
                  src="https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg"
                  alt="프로필 이미지_기본"
                />
              )}
            </button>
            <div className="flex flex-col gap-4">
              <h1
                className="break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {portfolio.displayName}
              </h1>
              <h3
                className="text-gray-500 break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {portfolio.shortBio}
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
              resizeHandle={<ResizeHandler handleAxis="se" />}
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
              {portfolio.assets.map((asset) => (
                <div key={asset.id} className="flex">
                  <GridItem
                    asset={asset}
                    layout={layouts[breakpoint]?.find(
                      (layout) => layout.i === asset.id,
                    )}
                    key={asset.id}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onChangeEditMode={() => {
                      setIsEditMode((pre) => !pre)
                    }}
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
        onClick={() => {
          mutate({
            userId: params.userId,
            updatedPortfolio: { ...portfolio, layout: layouts },
          })
        }}
      >
        저장하기
      </button>
    </div>
  )
}
