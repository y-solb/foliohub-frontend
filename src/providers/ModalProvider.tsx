'use client'

import React from 'react'
import AuthModal from '@/components/AuthModal'
import AlertModal from '@/components/AlertModal'

function ModalProvider() {
  return (
    <>
      <AuthModal />
      <AlertModal />
    </>
  )
}

export default ModalProvider
