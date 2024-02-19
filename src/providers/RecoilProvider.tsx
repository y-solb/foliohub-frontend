'use client'

import React from 'react'
import { RecoilRoot } from 'recoil'

function RecoilProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilProvider
