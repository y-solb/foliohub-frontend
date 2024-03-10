'use client'

import {
  JobCategory,
  useJobCategoryListQuery,
  useJobCategoryMutation,
} from '@/hooks/queries/jobCategory'
import { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'

interface JobCategoryModalProps {
  jobCode: string | null
  isOpen: boolean
  onClose: () => void
}

function JobCategoryModal({ jobCode, isOpen, onClose }: JobCategoryModalProps) {
  const { data: categoryList } = useJobCategoryListQuery()
  const { mutate } = useJobCategoryMutation()

  const [selectedCategory, setSelectedCategory] = useState<JobCategory>()
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const handleSelectCategory = (mainCategory: JobCategory) => {
    setSelectedCategory(mainCategory)
  }

  const handleSubCategorySelect = (code: string) => {
    setSelectedSubCategory(code)
  }

  const handleUpdateJob = () => {
    mutate({
      jobCode: selectedSubCategory,
    })
    onClose()
  }

  useEffect(() => {
    if (jobCode && categoryList) {
      setSelectedSubCategory(jobCode)
      const mainCategoryCode = jobCode.slice(0, 2)
      setSelectedCategory(
        categoryList.find((category) => category.code === mainCategoryCode),
      )
    }
  }, [categoryList, jobCode])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-between gap-4 p-4 max-w-[680px] min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <ul className="flex justify-center gap-4 py-2 w-full">
            {categoryList?.map((category) => (
              <li key={category.code}>
                <button
                  type="button"
                  className={`px-2 py-1 body1 hover:text-black hover:font-medium ${selectedCategory?.code === category.code ? 'text-black font-medium' : 'text-gray-400'}`}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap	justify-center gap-2">
            {selectedCategory?.sub.map((subcategory) => (
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
          onClick={handleUpdateJob}
        >
          변경하기
        </button>
      </div>
    </Modal>
  )
}

export default JobCategoryModal
