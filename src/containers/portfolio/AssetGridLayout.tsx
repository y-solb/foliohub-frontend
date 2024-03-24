'use client'

import SmallLogo from '@/components/common/SmallLogo'
import Asset from '@/components/grid/Asset'
import { LG_BREAKPOINT, MD_BREAKPOINT } from '@/constants'
import { UserData } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface AssetGridLayoutProps {
  portfolio: UserData
  layouts?: Layouts
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

  const assetsGrid = useMemo(
    () =>
      portfolio.assets.map((asset) => (
        <div key={asset.id} className="flex">
          <Asset
            asset={asset}
            breakpoint={breakpoint}
            layout={
              layouts &&
              layouts[breakpoint]?.find((layout) => layout.i === asset.id)
            }
          />
        </div>
      )),
    [breakpoint, layouts, portfolio.assets],
  )

  return (
    <>
      <div className="w-full max-w-7xl px-8 py-16 md:ml-80">
        <ResponsiveGridLayout
          useCSSTransforms
          breakpoints={{ lg: LG_BREAKPOINT, md: MD_BREAKPOINT }}
          cols={{ lg: 6, md: 2 }}
          rowHeight={rowHeight}
          layouts={layouts || undefined}
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
          {assetsGrid}
        </ResponsiveGridLayout>
      </div>
      <div className="flex justify-center items-center pb-16 md:hidden">
        <SmallLogo />
      </div>
    </>
  )
}

export default AssetGridLayout
