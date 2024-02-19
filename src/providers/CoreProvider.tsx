import RecoilProvider from './RecoilProvider'

function CoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RecoilProvider>{children}</RecoilProvider>
}

export default CoreProvider
