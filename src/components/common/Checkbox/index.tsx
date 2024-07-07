import React from 'react'
import { FaCheck } from 'react-icons/fa6'

interface CheckboxProps {
  id: string
  value: boolean
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  children: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, value, name, onChange, onBlur, children }, ref) => (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className="sr-only"
      />
      <label className="flex items-center gap-1 cursor-pointer" htmlFor={id}>
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-lg ${
            value ? 'bg-black' : 'bg-white border border-gray-400'
          }`}
        >
          {value && <FaCheck size={12} color="white" />}
        </div>
        {children}
      </label>
    </>
  ),
)

export default Checkbox
