import Logo from '../../common/Logo'

function HeaderSkeleton() {
  return (
    <div className="fixed top-0 left-0 z-10 w-full flex items-center justify-between lg:px-20 px-10 h-16">
      <div className="flex items-center justify-center gap-2">
        <Logo />
      </div>
      <div className="animate-pulse w-10 h-10 bg-gray-100 rounded-full" />
    </div>
  )
}

export default HeaderSkeleton
