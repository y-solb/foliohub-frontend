'use client'

import 'react-grid-layout/css/styles.css'
import {
  AssetType,
  AssetValueType,
  CommandType,
  SocialLinks,
  ToolType,
  UserData,
} from '@/types'
import React, { useEffect, useState } from 'react'
import { Layouts } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import {
  usePortfolioMutation,
  usePortfolioQuery,
} from '@/hooks/queries/portfolio'
import AssetGridLayoutEditor from '@/containers/portfolio/AssetGridLayoutEditor'
import ProfileEditor from '@/containers/portfolio/ProfileEditor'
import { useRouter } from 'next/navigation'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import { trimHTML } from '@/lib/utils'
import ProgressBar from '@/components/common/ProgressBar'
import { useSetRecoilState } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'
import PortfolioLayout from '@/components/layout/PortfolioLayout'
import Button from '@/components/common/Button'
import { useAuthQuery } from '@/hooks/queries/auth'

interface PortfolioEditorProps {
  username: string
}

export default function PortfolioEditor({ username }: PortfolioEditorProps) {
  const { openAlert } = useOpenAlertModal()
  const router = useRouter()
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useAuthQuery()
  const { data, isLoading } = usePortfolioQuery(username, {
    enabled: currentUser?.username === username,
  })
  const [portfolio, setPortfolio] = useState<UserData | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null)
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
  })
  const { mutate } = usePortfolioMutation()
  const setIsLoading = useSetRecoilState(progressBarState)

  const handleBeforeUnload = (event: Event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!isLoadingCurrentUser && currentUser?.username !== username) {
      router.push('/')
    }
  }, [currentUser?.username, isLoadingCurrentUser, router, username])

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (data) {
      const {
        id,
        displayName,
        shortBio,
        thumbnail,
        isLike,
        likeCount,
        assets,
        layout,
        socialLink,
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
      setSocialLinks(socialLink)
      setLayouts(layout)
    }
  }, [data, username])

  if (isLoading || !portfolio || !socialLinks) {
    return null
  }

  const handleAdd = (name: ToolType, value: AssetValueType) => {
    const newAsset = {
      id: uuidv4(),
      layoutId: uuidv4(),
      type: name,
      command: 'save',
      value,
    } as AssetType

    setPortfolio({
      ...portfolio,
      assets: [...portfolio.assets, newAsset],
    })
  }

  const handleProfileChange = (name: string, value: string) => {
    setPortfolio({
      ...portfolio,
      [name]: value,
    })
  }

  const handleSocialLinkChange = (name: string, value: string) => {
    setSocialLinks({
      ...socialLinks,
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

  const handleDelete = (
    id: string,
    layoutId: string,
    command?: CommandType,
  ) => {
    if (command === 'save') {
      // 새로 저장된 경우 filter로 삭제
      setPortfolio({
        ...portfolio,
        assets: portfolio.assets.filter((asset) => asset.id !== id),
      })
    } else {
      // 기존에 있던 데이터인 경우 command: 'delete' 추가
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
    }

    setLayouts({
      lg: layouts?.lg.filter((layout) => layout.i !== layoutId),
      md: layouts?.md.filter((layout) => layout.i !== layoutId),
    })
  }

  const handleLayoutChange = (currentLayout: Layouts) => {
    setLayouts(currentLayout)
  }

  const handleSavePortfolio = () => {
    const newDisplayName = trimHTML(portfolio.displayName ?? '')
    const newShortBio = trimHTML(portfolio.shortBio ?? '')

    if (!newDisplayName) {
      openAlert('이름을 알려주세요!')
      return
    }
    if (!newShortBio) {
      openAlert(
        '어라! 소개글이 비어있네요!',
        '포트폴리오에 자신의 이야기를 담아보세요.😊',
      )
      return
    }
    // if (!portfolio.thumbnail) {
    //   openAlert(
    //     '프로필 사진이 없네요.',
    //     '자신을 나타낼 수 있는 멋진 사진을 업로드해주세요.📸',
    //   )
    //   return
    // }
    setIsLoading(true)
    mutate(
      {
        username,
        updatedPortfolio: {
          ...portfolio,
          displayName: newDisplayName,
          shortBio: newShortBio,
          layout: layouts,
          socialLink: socialLinks,
        },
      },
      {
        onSuccess: (_, variables) => {
          setIsLoading(false)
          router.push(`/${variables.username}`)
        },
      },
    )
  }

  return (
    <div className="relative">
      <ProgressBar />
      <PortfolioLayout>
        <ProfileEditor
          portfolio={portfolio}
          socialLinks={socialLinks}
          onProfileChange={handleProfileChange}
          onSocialLinkChange={handleSocialLinkChange}
        />
        <AssetGridLayoutEditor
          portfolio={portfolio}
          layouts={layouts}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onLayoutChange={handleLayoutChange}
        />
      </PortfolioLayout>
      <Button
        className="fixed md:absolute md:top-5 bottom-5 right-5 md:right-10"
        onClick={handleSavePortfolio}
      >
        저장하기
      </Button>
    </div>
  )
}
