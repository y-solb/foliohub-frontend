'use client'

import React from 'react'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import Modal from '../common/Modal'

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
          <button
            type="button"
            className="flex items-center h-10 px-6 rounded-full text-white bg-black"
            onClick={closeAlert}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AlertModal
