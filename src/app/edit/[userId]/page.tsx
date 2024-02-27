/* eslint-disable @next/next/no-img-element */

'use client'

import 'react-grid-layout/css/styles.css'
import Toolbar from '@/components/toolbar/Toolbar'
import { AssetType, ToolType, UserData } from '@/types'
import React, { useEffect, useState } from 'react'
import { Layouts } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import {
  usePortfolioMutation,
  usePortfolioQuery,
} from '@/hooks/queries/portfolio'
import Profile from '@/containers/portfolio/Profile'
import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'

export default function EditPage({ params }: { params: { userId: string } }) {
  const { data, isLoading } = usePortfolioQuery(params.userId)
  const [portfolio, setPortfolio] = useState<UserData | null>(null)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })

  const { mutate } = usePortfolioMutation()

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

  const handleProfileChange = (name: string, value: string) => {
    setPortfolio({
      ...portfolio,
      [name]: value,
    })
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
          <Profile
            portfolio={portfolio}
            onProfileChange={handleProfileChange}
          />
          <AssetGridLayout
            portfolio={portfolio}
            layouts={layouts}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            onLayoutChange={(currentLayout: Layouts) => {
              setLayouts(currentLayout)
            }}
          />
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
