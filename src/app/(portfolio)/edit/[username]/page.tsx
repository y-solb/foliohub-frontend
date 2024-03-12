'use client'

import 'react-grid-layout/css/styles.css'
import Toolbar from '@/components/toolbar/Toolbar'
import { AssetType, ToolType, UserData } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import { Layouts } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import {
  usePortfolioMutation,
  usePortfolioQuery,
} from '@/hooks/queries/portfolio'
import AssetGridLayoutEditor from '@/containers/portfolio/AssetGridLayoutEditor'
import ProfileEditor from '@/containers/portfolio/ProfileEditor'
import { useRouter } from 'next/navigation'

export default function EditPage({ params }: { params: { username: string } }) {
  const { data, isLoading } = usePortfolioQuery(params.username)
  const displayNameRef = useRef<HTMLHeadingElement | null>(null)
  const shortBioRef = useRef<HTMLHeadingElement | null>(null)
  const [portfolio, setPortfolio] = useState<UserData | null>(null)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })
  const router = useRouter()
  const { mutate } = usePortfolioMutation()

  useEffect(() => {
    if (data) {
      const {
        id,
        username,
        displayName,
        shortBio,
        thumbnail,
        isLike,
        likeCount,
        assets,
        layout,
      } = data
      setPortfolio({
        id,
        username,
        displayName,
        shortBio,
        thumbnail,
        isLike,
        likeCount,
        assets,
      })
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
      assets: portfolio.assets.map((asset) =>
        asset.id === id
          ? {
              ...asset,
              command: 'delete',
            }
          : asset,
      ),
    })

    setLayouts({
      lg: layouts?.lg.filter((layout) => layout.i !== id),
      md: layouts?.md.filter((layout) => layout.i !== id),
    })
  }

  const handleSavePortfolio = () => {
    if (!displayNameRef.current?.innerHTML || !shortBioRef.current?.innerHTML) {
      alert('displayNameRef, shortBioRef값을 입력해 주세요')
      return
    }

    mutate(
      {
        username: params.username,
        updatedPortfolio: {
          ...portfolio,
          displayName: displayNameRef.current?.innerHTML,
          shortBio: shortBioRef.current?.innerHTML,
          layout: layouts,
        },
      },
      {
        onSuccess: (_, variables) => {
          router.push(`/${variables.username}`)
        },
      },
    )
  }

  return (
    <div className="relative">
      <Toolbar onAdd={handleAdd} />
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-[100rem] md:flex-row flex-col">
          <ProfileEditor
            portfolio={portfolio}
            displayNameRef={displayNameRef}
            shortBioRef={shortBioRef}
            onProfileChange={handleProfileChange}
          />
          <AssetGridLayoutEditor
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
        className="fixed bottom-8 left-8 h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
        onClick={handleSavePortfolio}
      >
        저장하기
      </button>
    </div>
  )
}
