'use client'

import React from 'react'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

function AlertModal() {
  const { alertModal, closeAlert } = useOpenAlertModal()

  return (
    <Modal isOpen={alertModal.isOpen} onClose={closeAlert}>
      <div className="flex flex-col justify-center gap-4 w-80 p-6">
        <div className="flex flex-col gap-2">
          <p className="subtitle1">{alertModal.title}</p>
          <p className="body2 text-gray-400">{alertModal.content}</p>
        </div>
        <div className="flex justify-end w-full">
          <Button onClick={closeAlert}>확인</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AlertModal
