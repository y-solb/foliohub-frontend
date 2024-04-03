import { useRecoilValue } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'

function ProgressBar() {
  const isLoading = useRecoilValue(progressBarState)

  if (!isLoading) return null

  return (
    <div className="w-full bg-gray-200 h-1.5 fixed top-0 left-0 z-50">
      <div className="absolute top-0 left-0 w-5/12 brand-gradient h-1.5 animate-loader" />
    </div>
  )
}

export default ProgressBar
