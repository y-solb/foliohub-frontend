import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'

const ResizeHandler = React.forwardRef<
  HTMLDivElement,
  {
    handleAxis: ResizeHandle
  }
>((props, ref) => {
  const { handleAxis, ...restProps } = props
  return (
    <div
      ref={ref}
      className={`resize-handler absolute bottom-1 right-1 cursor-se-resize handle-${handleAxis}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <FaAngleRight size="24" className="text-gray-200 rotate-45" />
    </div>
  )
})
export default ResizeHandler
