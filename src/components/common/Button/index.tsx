import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

export const ButtonVariants = cva(
  `flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed`,
  {
    variants: {
      variant: {
        contained: 'text-white bg-black',
        outlined: 'border border-solid border-gray-600 text-gray-600 bg-white',
        inactive:
          'border border-solid  hover:bg-gray-100 bg-white text-gray-400 border-gray-200',
        selected:
          'border border-solid  hover:bg-gray-100 bg-white font-medium text-gray-600  border-gray-600 ',
      },
      size: {
        md: 'h-10 px-5 rounded-3xl body2',
        lg: 'h-10 px-6 rounded-full body1',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'lg',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  className?: string
  children: React.ReactNode
}

function Button({
  variant = 'contained',
  size = 'lg',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(ButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
