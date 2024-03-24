import AssetEditor from '@/components/grid/AssetEditor'
import ResizeHandler from '@/components/grid/ResizeHandler'
import Toolbar from '@/components/toolbar/Toolbar'
import {
  LG_BREAKPOINT,
  MD_BREAKPOINT,
  PREVENT_DRAG_DEFAULTS,
} from '@/constants'
import useToggle from '@/hooks/useToggle'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import { AssetType, ToolType, UserData } from '@/types'
import { useEffect, useState } from 'react'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilValue } from 'recoil'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface AssetGridLayoutEditorProps {
  portfolio: UserData
  layouts?: Layouts
  onAdd: (name: ToolType, value?: string) => void
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
  onLayoutChange: (currentLayout: Layouts) => void
}

function AssetGridLayoutEditor({
  portfolio,
  layouts,
  onAdd,
  onUpdate,
  onDelete,
  onLayoutChange,
}: AssetGridLayoutEditorProps) {
  const [breakpoint, setBreakpoint] = useState('')
  const [rowHeight, setRowHeight] = useState(168)
  const [isEditMode, toggle] = useToggle(false)
  const activeAssetId = useRecoilValue(activeAssetIdState)

  useEffect(() => {
    const windowWidth = window.innerWidth

    if (windowWidth >= LG_BREAKPOINT) {
      setBreakpoint('lg')
    } else if (windowWidth >= MD_BREAKPOINT) {
      setBreakpoint('md')
    }
  }, [])

  return (
    <div className="w-full max-w-7xl px-8 py-16 md:ml-80">
      <Toolbar onAdd={onAdd} />
      <ResponsiveGridLayout
        useCSSTransforms
        breakpoints={{ lg: LG_BREAKPOINT, md: MD_BREAKPOINT }}
        cols={{ lg: 6, md: 2 }}
        rowHeight={rowHeight}
        layouts={layouts || undefined}
        verticalCompact
        compactType={null}
        isDraggable={!isEditMode}
        draggableCancel={PREVENT_DRAG_DEFAULTS.join(',')}
        resizeHandle={<ResizeHandler handleAxis="se" />}
        onBreakpointChange={(newBreakpoint) => {
          setBreakpoint(newBreakpoint)
        }}
        onLayoutChange={(_, currentLayout) => {
          onLayoutChange(currentLayout)
        }}
        onWidthChange={(width, margin, cols) => {
          setRowHeight((width - (cols + 1) * margin[0]) / cols)
        }}
      >
        {portfolio.assets.map(
          (asset) =>
            asset.command !== 'delete' && (
              <div
                key={asset.id}
                className={`flex cursor-move ${activeAssetId === asset.id ? 'z-50' : 'hover:z-40'}`}
              >
                <AssetEditor
                  asset={asset}
                  breakpoint={breakpoint}
                  layout={
                    layouts &&
                    layouts[breakpoint]?.find((layout) => layout.i === asset.id)
                  }
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onChangeEditMode={toggle}
                />
              </div>
            ),
        )}
      </ResponsiveGridLayout>
    </div>
  )
}

export default AssetGridLayoutEditor
