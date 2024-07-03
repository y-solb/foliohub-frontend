'use client'

import React from 'react'
import AuthModal from '@/components/modal/AuthModal'
import AlertModal from '@/components/modal/AlertModal'
import ConfirmModal from '@/components/modal/ConfirmModal'

function ModalProvider() {
  return (
    <>
      <AuthModal />
      <AlertModal />
      <ConfirmModal />
    </>
  )
}

export default ModalProvider
