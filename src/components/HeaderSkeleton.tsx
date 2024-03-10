import Image from 'next/image'

function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between lg:px-20 px-10 py-4 h-24">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/foliohub_text.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-full" />
    </div>
  )
}

export default HeaderSkeleton
