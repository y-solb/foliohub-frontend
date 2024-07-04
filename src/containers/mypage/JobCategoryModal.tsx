'use client'

import {
  JobCategoryData,
  useJobCategoryListQuery,
  useJobCategoryMutation,
} from '@/hooks/queries/jobCategory'
import { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

interface JobCategoryModalProps {
  jobCode: string | null
  isOpen: boolean
  onClose: () => void
}

function JobCategoryModal({ jobCode, isOpen, onClose }: JobCategoryModalProps) {
  const { data: categoryList } = useJobCategoryListQuery()
  const { mutate } = useJobCategoryMutation()

  const [selectedCategory, setSelectedCategory] = useState<JobCategoryData>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    '',
  )

  const handleSelectCategory = (mainCategory: JobCategoryData) => {
    setSelectedCategory(mainCategory)
  }

  const handleSubCategorySelect = (code: string) => {
    setSelectedSubCategory(code)
  }

  const handleUpdateJob = () => {
    if (!selectedSubCategory) return
    mutate({
      jobCode: selectedSubCategory,
    })
    onClose()
  }

  useEffect(() => {
    if (!categoryList) return
    setSelectedSubCategory(jobCode)
    const mainCategoryCode = jobCode ? jobCode.slice(0, 2) : null
    setSelectedCategory(
      mainCategoryCode
        ? categoryList.find((category) => category.code === mainCategoryCode)
        : categoryList[0],
    )
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
                <Button
                  variant={
                    selectedSubCategory === subcategory.code
                      ? 'selected'
                      : 'inactive'
                  }
                  size="md"
                  onClick={() => handleSubCategorySelect(subcategory.code)}
                >
                  {subcategory.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full" onClick={handleUpdateJob}>
          변경하기
        </Button>
      </div>
    </Modal>
  )
}

export default JobCategoryModal
