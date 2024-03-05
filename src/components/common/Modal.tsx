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

// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `
// const fadeOut = keyframes`
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// `
// const popInFromBottom = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(400px) scale(0.75);
//   }
//   75% {
//     opacity: 1;
//     transform: translateY(-16px) scale(1.0);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0px);
//   }`
// const popOutToBottom = keyframes`
//   0% {
//     opacity: 1;
//     transform: translateY(0px) scale(1.0);
//   }
//   100% {
//     opacity: 0;
//     transform: translateY(400px) scale(0.75);
//   }`

// const BackModalWrapper = styled.div<{
//   isOpen: boolean
// }>`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #000000b2;
//   opacity: 0.85;
//   cursor: pointer;
//   ${(props) =>
//     props.isOpen
//       ? css`
//           animation: ${fadeIn} 0.25s forwards;
//         `
//       : css`
//           animation: ${fadeOut} 0.25s forwards;
//         `}
// `
// const ModalWrapper = styled.div<{ isOpen: boolean }>`
//   position: relative;
//   border-radius: 20px;
//   background: ${({ theme }) => theme.colors.primaryWhite};
//   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
//   z-index: 9999;
//   max-width: 1040px;
//   max-height: 80vh;
//   overflow-y: hidden;
//   padding-bottom: 30px;
//   cursor: default;
//   ${(props) =>
//     props.isOpen
//       ? css`
//           animation: ${popInFromBottom} 0.4s forwards ease-in-out;
//         `
//       : css`
//           animation: ${popOutToBottom} 0.2s forwards ease-in-out;
//         `};
// `
