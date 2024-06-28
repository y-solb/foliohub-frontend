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

const variantToHeightClass = {
  h1: 'h-9',
  h2: 'h-8',
  h3: 'h-7',
  title: 'h-8',
  subtitle1: 'h-7',
  subtitle2: 'h-6',
  body1: 'h-6',
  body2: 'h-5',
  body3: 'h-4',
  default: 'h-6',
}

function SkeletonText({
  width = '100%',
  variant = 'body1',
}: SkeletonTextProps) {
  const heightClass = variantToHeightClass[variant]

  return (
    <div
      className={`rounded-2xl bg-gray-100 ${heightClass}`}
      style={{ width }}
    />
  )
}

export default SkeletonText
