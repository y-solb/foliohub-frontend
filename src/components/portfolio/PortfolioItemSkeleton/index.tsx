import SkeletonText from '../../common/SkeletonText'

function PortfolioItemSkeleton() {
  return (
    <li className="grid-item-wrapper">
      <div className="animate-pulse relative flex flex-col items-center px-10 py-8 w-full h-full">
        <div className="relative min-w-32 min-h-32 rounded-full border border-solid border-gray-100 bg-gray-100" />
        <div className="w-full flex flex-col items-center mt-4 gap-2 h-20">
          <SkeletonText variant="h2" width="30%" />
          <SkeletonText variant="body2" />
          <SkeletonText variant="body2" />
        </div>
        <div className="flex items-center bg-gray-100 w-32 h-8 px-4 rounded-3xl text-gray-400 mt-6" />
      </div>
    </li>
  )
}

export default PortfolioItemSkeleton
