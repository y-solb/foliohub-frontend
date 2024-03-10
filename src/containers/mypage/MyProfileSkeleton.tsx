import SkeletonText from '@/components/common/SkeletonText'

function MyProfileSkeleton() {
  return (
    <div className="animate-pulse px-8 py-10">
      <div className="flex items-center justify-center">
        <div className="flex gap-8">
          <div className="relative flex min-w-32 min-h-32 rounded-full border border-solid border-gray-100 shadow-md bg-gray-100" />
          <div className="flex flex-col justify-center gap-2">
            <SkeletonText variant="h1" width="120px" />
            <div className="flex items-center gap-2">
              <SkeletonText variant="body1" width="180px" />
              <div className="w-9 h-9 bg-gray-100 rounded-full " />
            </div>
            <div className="flex items-center h-11 px-6 rounded-3xl text-white subtitle2 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfileSkeleton
