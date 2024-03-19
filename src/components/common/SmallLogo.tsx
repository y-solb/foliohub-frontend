import Link from 'next/link'
import Image from 'next/image'

function SmallLogo() {
  return (
    <Link href="/">
      <Image
        src="/foliohub_text_logo.svg"
        alt="text_logo"
        width={72}
        height={32}
      />
    </Link>
  )
}

export default SmallLogo
