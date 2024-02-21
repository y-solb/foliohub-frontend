import ReactQueryProvider from './ReactQueryProvider'
import RecoilProvider from './RecoilProvider'

function CoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>{children}</RecoilProvider>
    </ReactQueryProvider>
  )
}

export default CoreProvider
