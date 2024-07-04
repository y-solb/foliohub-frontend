'use client'

import React from 'react'
import Modal from '@/components/common/Modal'
import useOpenConfirmModal from '@/hooks/useOpenConfirmModal'
import Button from '@/components/common/Button'

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
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
