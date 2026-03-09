import { useEffect, useState } from 'react'
import { useEditionStore } from './store/editionStore'
import Navbar from './components/editor/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Toolbar from './components/editor/Toolbar'
import PageTabs from './components/editor/PageTabs'
import Canvas from './components/editor/Canvas'
import PropertiesPanel from './components/editor/PropertiesPanel'
import PreviewMode from './components/preview/PreviewMode'

function App() {
  const { edition, activePageId, setActivePageId } = useEditionStore()
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    // Initial active page
    if (!activePageId && edition.pages.length > 0) {
      setActivePageId(edition.pages[0].id)
    }
  }, [activePageId, edition.pages, setActivePageId])

  if (isPreview) {
    return <PreviewMode onClose={() => setIsPreview(false)} />
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-neutral-100 font-sans text-neutral-900">
      <Navbar onPreview={() => setIsPreview(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-neutral-200 bg-white">
          <Sidebar />
        </div>

        {/* Editor Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Toolbar />

          <div className="flex-1 overflow-auto bg-neutral-200 p-8 scroll-smooth">
            <div className="mx-auto min-h-full w-fit">
              <PageTabs />
              <div className="shadow-2xl">
                <Canvas />
              </div>
              <div className="mt-8 h-20" /> {/* Spacer */}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 flex-shrink-0 border-l border-neutral-200 bg-white">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  )
}

export default App
