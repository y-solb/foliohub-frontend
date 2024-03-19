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
    <div className="absolute -bottom-16 left-0 shadow-wrapper p-3 flex gap-2 z-10 ">
      <input
        type="text"
        ref={inputRef}
        className="body2"
        defaultValue={defaultValue}
        onKeyUp={handleEnterKey}
      />
      <button type="button" aria-label={buttonLabel} onClick={handleUpdate}>
        <FaCirclePlus size={24} />
      </button>
    </div>
  )
}
