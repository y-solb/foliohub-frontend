import { GoSmiley } from 'react-icons/go'

function EmptyThumbnail() {
  return (
    <div className="relative rounded-full border border-solid border-gray-100 bg-gray-200 w-full h-full">
      <GoSmiley
        color="white"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
      />
    </div>
  )
}

export default EmptyThumbnail
