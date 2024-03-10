import Image from 'next/image'

function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between px-8 py-4 h-20">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/foliohub_text.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
      </div>
      <div className="w-9 h-9 bg-gray-100 rounded-full" />
    </div>
  )
}

export default HeaderSkeleton
