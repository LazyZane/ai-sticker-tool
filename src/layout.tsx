import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './contexts/theme-context'

export const metadata: Metadata = {
  title: 'AI表情包制作工具站',
  description: 'AI表情包制作工具站 - 从零打造你的专属微信表情包',
  generator: 'Codebuddy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
