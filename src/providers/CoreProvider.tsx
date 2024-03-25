import ModalProvider from './ModalProvider'
import ReactQueryProvider from './ReactQueryProvider'
import RecoilProvider from './RecoilProvider'
import 'react-image-crop/dist/ReactCrop.css'

function CoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>
        {children}
        <ModalProvider />
        <div id="modal-root" />
      </RecoilProvider>
    </ReactQueryProvider>
  )
}

export default CoreProvider
