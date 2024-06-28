import Image from 'next/image'

interface LogoProps {
  size?: 's' | 'l'
}

function Logo({ size = 'l' }: LogoProps) {
  const width = size === 's' ? 72 : 120

  return (
    <Image
      src="/foliohub_text_logo.svg"
      alt="text_logo"
      width={width}
      height={32}
      priority
    />
  )
}

export default Logo
