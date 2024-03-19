import Image from 'next/image'

function HeaderSkeleton() {
  return (
    <div className=" flex items-center justify-between lg:px-20 px-10 h-16">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/foliohub_text_logo.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
      </div>
      <div className="animate-pulse w-10 h-10 bg-gray-100 rounded-full" />
    </div>
  )
}

export default HeaderSkeleton
