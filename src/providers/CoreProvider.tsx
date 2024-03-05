import AuthModal from '@/components/AuthModal'
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
        <AuthModal />
        <div id="modal-root" />
      </RecoilProvider>
    </ReactQueryProvider>
  )
}

export default CoreProvider
