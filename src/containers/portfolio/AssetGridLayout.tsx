'use client'

import Logo from '@/components/common/Logo'
import Asset from '@/components/asset/Asset'
import { LG_BREAKPOINT, MD_BREAKPOINT } from '@/constants/layout'
import { BreakpointType, Portfolio } from '@/types'
import { useEffect, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import Link from 'next/link'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface AssetGridLayoutProps {
  portfolio: Portfolio
  layouts?: Layouts
}

function AssetGridLayout({ portfolio, layouts }: AssetGridLayoutProps) {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>()
  const [rowHeight, setRowHeight] = useState(168)

  useEffect(() => {
    const windowWidth = window.innerWidth

    if (windowWidth >= LG_BREAKPOINT) {
      setBreakpoint('lg')
    } else if (windowWidth >= MD_BREAKPOINT) {
      setBreakpoint('md')
    }
  }, [])

  if (!breakpoint) return null

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
            setBreakpoint(newBreakpoint as BreakpointType)
          }}
          onWidthChange={(width, margin, cols) => {
            setRowHeight((width - (cols + 1) * margin[0]) / cols)
          }}
        >
          {portfolio.assets.map((asset) => (
            <div key={asset.layoutId} className="flex">
              <Asset
                asset={asset}
                breakpoint={breakpoint}
                layout={
                  layouts &&
                  layouts[breakpoint]?.find(
                    (layout) => layout.i === asset.layoutId,
                  )
                }
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
      <div className="flex justify-center items-center pb-16 md:hidden">
        <Link href="/">
          <Logo size="s" />
        </Link>
      </div>
    </>
  )
}

export default AssetGridLayout
