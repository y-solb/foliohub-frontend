import { useRecoilValue } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'

function ProgressBar() {
  const progressBar = useRecoilValue(progressBarState)
  const { isLoading, percent } = progressBar
  if (!isLoading) return null

  return (
    <div className="w-full bg-gray-200 h-2 mb-4 fixed top-0 z-50">
      <div className="brand-gradient h-2" style={{ width: `${percent}%` }} />
    </div>
  )
}

export default ProgressBar
