'use client'

import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  isBorder?: boolean
  children: React.ReactNode
  onClose: () => void
}

function Modal({ isOpen, isBorder = true, children, onClose }: ModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const onClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backgroundRef.current) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'initial'
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (isOpen) {
      setIsVisible(true)
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 200)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isOpen])
  const element = document.getElementById('modal-root')
  if (!element) return null

  if (!isOpen && !isVisible) return null

  return ReactDOM.createPortal(
    <div
      ref={backgroundRef}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black/60 ${
        isOpen ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
      role="presentation"
      onClick={onClickBackground}
    >
      <div
        className={`relative z-30 rounded-2xl ${isBorder && 'border border-solid border-gray-100'} bg-white shadow-md ${
          isOpen ? 'animate-popInFromBottom' : 'animate-popOutToBottom'
        }`}
      >
        {children}
      </div>
    </div>,
    element,
  )
}

export default Modal
