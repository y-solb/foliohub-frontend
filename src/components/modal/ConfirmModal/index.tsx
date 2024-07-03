'use client'

import React from 'react'
import Modal from '@/components/common/Modal'
import useOpenConfirmModal from '@/hooks/useOpenConfirmModal'

function ConfirmModal() {
  const { confirmModal, closeConfirm } = useOpenConfirmModal()

  const handleConfirm = () => {
    if (confirmModal.onConfirm) {
      confirmModal.onConfirm()
    }
    closeConfirm()
  }

  const handleCancel = () => {
    closeConfirm()
  }

  return (
    <Modal isOpen={confirmModal.isOpen} onClose={closeConfirm}>
      <div className="flex flex-col justify-center gap-4 w-80 p-6">
        <div className="flex flex-col gap-2">
          <p className="subtitle1">{confirmModal.title}</p>
          <p className="body2 text-gray-400">{confirmModal.content}</p>
        </div>
        <div className="flex justify-end w-full gap-4">
          <button
            type="button"
            className="flex items-center h-10 px-6 rounded-full text-black bg-white border border-solid border-black"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            type="button"
            className="flex items-center h-10 px-6 rounded-full text-white bg-black"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
