'use client'

import React from 'react'
import AuthModal from '@/components/modal/AuthModal'
import AlertModal from '@/components/modal/AlertModal'

function ModalProvider() {
  return (
    <>
      <AuthModal />
      <AlertModal />
    </>
  )
}

export default ModalProvider
