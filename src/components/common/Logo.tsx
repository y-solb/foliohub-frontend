import Image from 'next/image'

function Logo() {
  return (
    <Image
      src="/foliohub_text_logo.svg"
      alt="text_logo"
      width={120}
      height={32}
      priority
    />
  )
}

export default Logo
