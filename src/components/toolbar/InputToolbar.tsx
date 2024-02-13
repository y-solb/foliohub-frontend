import React, { useRef } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

interface InputToolbarProps {
  defaultValue: string
  buttonLabel: string
  onAdd: (inputValue: string) => void
}

export default function InputToolbar({
  buttonLabel,
  defaultValue,
  onAdd,
}: InputToolbarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpdate = () => {
    if (!inputRef.current) {
      return
    }
    if (!inputRef.current.value) {
      console.log('please press your --') // TODO: need modal
      return
    }
    onAdd(inputRef.current.value)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate()
    }
  }

  return (
    <div className="absolute -bottom-16 left-0 toolbar-wrapper flex">
      <input
        type="text"
        ref={inputRef}
        defaultValue={defaultValue}
        onKeyUp={handleEnterKey}
      />
      <button type="button" aria-label={buttonLabel} onClick={handleUpdate}>
        <FaCirclePlus size={24} />
      </button>
    </div>
  )
}