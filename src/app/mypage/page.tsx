'use client'

import Header from '@/components/Header'
import Modal from '@/components/common/Modal'
import BaseLayout from '@/components/layout/BaseLayout'
import {
  JobCategory,
  useJobCategoryListQuery,
  useJobCategoryMutation,
} from '@/hooks/queries/jobCategory'
import { useInfiniteLikePortfolioQuery } from '@/hooks/queries/portfolio'
import { useMyQuery } from '@/hooks/queries/user'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useToggle from '@/hooks/useToggle'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'
import Navbar from '@/containers/mypage/Navbar'

export default function Mypage() {
  const { data: myInfo, isLoading } = useMyQuery()
  const { data: categoryList } = useJobCategoryListQuery()
  const { mutate } = useJobCategoryMutation()
  const {
    data,
    isLoading: likeLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteLikePortfolioQuery()
  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  const [isOpen, toggle] = useToggle(false)

  const [selectedMainCategory, setSelectedMainCategory] =
    useState<JobCategory>()
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const handleMainCategorySelect = (mainCategory: JobCategory) => {
    setSelectedMainCategory(mainCategory)
  }

  const handleSubCategorySelect = (jobCode: string) => {
    setSelectedSubCategory(jobCode)
  }

  const handleUpdateJob = () => {
    mutate({
      jobCode: selectedSubCategory,
    })
  }

  useEffect(() => {
    if (myInfo && categoryList) {
      setSelectedSubCategory(myInfo.jobCode)
      const mainCategoryCode = myInfo.jobCode.slice(0, 2)
      setSelectedMainCategory(
        categoryList.find((category) => category.code === mainCategoryCode),
      )
    }
  }, [myInfo, categoryList])

  if (!myInfo || isLoading || likeLoading) return null

  return (
    <div>
      <Header />
      <BaseLayout />
      <div className="px-8 py-8">
        <div className="flex items-center justify-center">
          <div className="flex gap-8">
            <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
              {myInfo.thumbnail && (
                <Image
                  src={myInfo.thumbnail}
                  alt={`image_${myInfo.id}`}
                  priority
                  fill
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1>{myInfo.userId}</h1>
              <div className="flex items-center gap-2">
                <p className="body1 text-gray-400">{myInfo.job}</p>
                <button
                  type="button"
                  aria-label="edit-job"
                  className="rounded-full border border-solid border-gray-200 text-gray-600 bg-white p-2"
                  onClick={toggle}
                >
                  <MdModeEdit size={16} />
                </button>
              </div>

              <Link
                href={`${myInfo.userId}`}
                className="flex items-center h-11 px-6 rounded-3xl text-white brand-gradient subtitle2"
              >
                포트폴리오 보러가기
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <div className="px-8">
        <ul className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {portfolios.map((portfolio) => (
            <li key={portfolio.id} className="grid-item-wrapper h-82">
              <Link
                href={`/${portfolio.userId}`}
                className="relative flex flex-col items-center px-10 py-8 w-full h-full"
              >
                <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
                  {portfolio.thumbnail && (
                    <Image
                      src={portfolio.thumbnail}
                      alt={`image_${portfolio.id}`}
                      priority
                      fill
                    />
                  )}
                </div>
                <div className="flex flex-col items-center mt-4 gap-2">
                  <h2>{portfolio.displayName}</h2>
                  <p className="body2 text-gray-400 ellipsis2">
                    {portfolio.shortBio}
                  </p>
                </div>
                <div className="flex items-center h-8 px-4 rounded-3xl text-gray-400 border border-solid border-gray-200 body2 font-medium mt-6">
                  {portfolio.userJob}
                </div>
                <div className="absolute bottom-3 right-6 flex gap-1 items-center justify-end">
                  <IoMdHeart size={16} className="text-gray-300" />
                  <span className="text-gray-300 body2">
                    {portfolio.likeCount}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {isFetching && (
            <p>무한스크롤 추가로 데이터 가져오는 스켈레톤 UI 추가</p>
          )}
        </ul>
        <div ref={loaderRef}>로딩중</div>
      </div>
      <Modal isOpen={isOpen} onClose={toggle}>
        <div className="flex flex-col justify-between gap-4 p-4 max-w-[680px] min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <ul className="flex justify-center gap-4 py-2 w-full">
              {categoryList?.map((category) => (
                <li key={category.code}>
                  <button
                    type="button"
                    className={`px-2 py-1 body1 hover:text-black hover:font-medium ${selectedMainCategory?.code === category.code ? 'text-black font-medium' : 'text-gray-400'}`}
                    onClick={() => handleMainCategorySelect(category)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap	justify-center gap-2">
              {selectedMainCategory?.sub.map((subcategory) => (
                <li key={subcategory.code}>
                  <button
                    type="button"
                    className={`h-10 px-4 rounded-3xl border border-solid  hover:border-gray-400 bg-white body2 ${selectedSubCategory === subcategory.code ? 'text-black font-medium border-black border-[1.5px]' : 'text-gray-400 border-gray-200'}`}
                    onClick={() => handleSubCategorySelect(subcategory.code)}
                  >
                    {subcategory.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="w-full h-10 rounded-2xl text-white bg-black"
            onClick={() => {
              toggle()
              handleUpdateJob()
            }}
          >
            변경하기
          </button>
        </div>
      </Modal>
    </div>
  )
}
