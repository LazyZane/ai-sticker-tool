import { useState } from 'react'
import { TutorialSection } from '@/components/tutorial-section'
import { ImageToolSection } from '@/components/image-tool-section'
import { Navigation } from '@/components/navigation'
import { FloatingTOC } from '@/components/floating-toc'

function App() {
  const [activeSection, setActiveSection] = useState<'tutorial' | 'tool'>('tutorial')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 from-gray-50 via-blue-50 to-gray-50">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 主内容区 */}
          <div className="flex-1">
            {activeSection === 'tutorial' ? (
              <TutorialSection onToolRedirect={() => setActiveSection('tool')} />
            ) : (
              <ImageToolSection />
            )}
          </div>

          {/* 浮动目录 */}
          {activeSection === 'tutorial' && (
            <div className="hidden lg:block w-64 sticky top-8 h-fit">
              <FloatingTOC />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App