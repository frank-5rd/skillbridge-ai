import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'جسر الخبرة | SkillBridge AI',
  description: 'منصة المحاكاة التفاعلية - واجه المدير الغاضب والعميل الصعب قبل المقابلة الحقيقية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  )
}