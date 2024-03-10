import Asset from '@/components/grid/Asset'
import { LG_BREAKPOINT, MD_BREAKPOINT } from '@/constants'
import { UserData } from '@/types'
import { useEffect, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface AssetGridLayoutProps {
  portfolio: UserData
  layouts: Layouts
}

function AssetGridLayout({ portfolio, layouts }: AssetGridLayoutProps) {
  const [breakpoint, setBreakpoint] = useState('')
  const [rowHeight, setRowHeight] = useState(168)

  useEffect(() => {
    const windowWidth = window.innerWidth

    if (windowWidth >= LG_BREAKPOINT) {
      setBreakpoint('lg')
    } else if (windowWidth >= MD_BREAKPOINT) {
      setBreakpoint('md')
    }
  }, [])

  return (
    <div className="w-full max-w-7xl px-8 py-16">
      <ResponsiveGridLayout
        breakpoints={{ lg: LG_BREAKPOINT, md: MD_BREAKPOINT }}
        cols={{ lg: 6, md: 2 }}
        rowHeight={rowHeight}
        layouts={layouts}
        verticalCompact
        compactType={null}
        isDraggable={false}
        isResizable={false}
        onBreakpointChange={(newBreakpoint) => {
          setBreakpoint(newBreakpoint)
        }}
        onWidthChange={(width, margin, cols) => {
          setRowHeight((width - (cols + 1) * margin[0]) / cols)
        }}
      >
        {portfolio.assets.map((asset) => (
          <div key={asset.id} className="flex">
            <Asset
              asset={asset}
              layout={layouts[breakpoint]?.find(
                (layout) => layout.i === asset.id,
              )}
              key={asset.id}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default AssetGridLayout
