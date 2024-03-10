interface SkeletonTextProps {
  width?: string
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'title'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'body3'
}

function SkeletonText({
  width = '100%',
  variant = 'body1',
}: SkeletonTextProps) {
  let heightClass: string

  switch (variant) {
    case 'h1':
      heightClass = 'h-9'
      break
    case 'h2':
      heightClass = 'h-8'
      break
    case 'h3':
      heightClass = 'h-7'
      break
    case 'title':
      heightClass = 'h-8'
      break
    case 'subtitle1':
      heightClass = 'h-7'
      break
    case 'subtitle2':
      heightClass = 'h-6'
      break
    case 'body1':
      heightClass = 'h-6'
      break
    case 'body2':
      heightClass = 'h-5'
      break
    case 'body3':
      heightClass = 'h-4'
      break
    default:
      heightClass = 'h-6'
  }

  return (
    <div
      className={`rounded-2xl bg-gray-100 ${heightClass}`}
      style={{ width }}
    />
  )
}

export default SkeletonText
