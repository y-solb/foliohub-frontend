import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'

export const ButtonLinkVariants = cva(
  `inline-flex justify-center items-center`,
  {
    variants: {
      variant: {
        contained: 'text-white bg-black',
        outlined: 'border border-solid border-gray-600 text-gray-600 bg-white',
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

interface ButtonLinkProps
  extends Omit<LinkProps, 'href'>,
    VariantProps<typeof ButtonLinkVariants> {
  href: string
  target?: string
  className?: string
  children: React.ReactNode
}

function ButtonLink({
  variant = 'contained',
  size = 'lg',
  href,
  target,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(ButtonLinkVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
