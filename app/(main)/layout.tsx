import Footer from "@/app/(main)/footer"
import Header from "@/app/(main)/header"
import { auth } from "@/auth"
import { SignIn } from "@/components/SignIn"
import getEnv from "@/lib/env-entry"
import React from "react"
import Script from "next/script"

type DashboardProps = {
  children: React.ReactNode
}

export default function MainLayout({ children }: DashboardProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh-calc(var(--spacing)*16))] flex-1 flex-col gap-4 bg-background p-4 md:p-10 md:pt-8">
        <Header />
        <AuthProtected>{children}</AuthProtected>
        <Footer />
      </main>
      {/* 调整外部脚本加载策略 */}
      <Script
        src="https://cdn.jsdelivr.net/gh/mocchen/cssmeihua@master/js/yinghua.js"
        strategy="lazyOnload" // 页面加载完成后执行
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/mocchen/cssmeihua@master/js/aixin.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/mocchen/cssmeihua@master/js/xiaoxingxing.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/mocchen/cssmeihua@master/js/zhizhuwang.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/mocchen/cssmeihua@master/js/yanhuabowen.js"
        strategy="lazyOnload"
      />
    </div>
  )
}

async function AuthProtected({ children }: DashboardProps) {
  if (getEnv("SitePassword")) {
    const session = await auth()
    if (!session) {
      return <SignIn />
    }
  }
  return children
}
