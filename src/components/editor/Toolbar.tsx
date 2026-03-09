import { Search, ZoomIn, ZoomOut, Layers, MousePointer2 } from 'lucide-react'

const Toolbar = () => {
    return (
        <div className="h-12 flex-shrink-0 border-b border-neutral-200 bg-white px-6 flex items-center justify-between shadow-sm z-40">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 p-1.5 bg-neutral-100 rounded-xl">
                    <button className="p-1.5 rounded-lg bg-white shadow-sm text-red-600 transition-all font-bold text-xs uppercase italic flex items-center px-3">
                        <MousePointer2 size={14} className="mr-1.5" /> Select
                    </button>
                    <button className="p-1.5 rounded-lg text-neutral-500 hover:bg-white hover:text-neutral-900 transition-all font-bold text-xs uppercase italic px-3">
                        <Search size={14} className="mr-1.5" /> Hand
                    </button>
                </div>

                <div className="h-4 w-px bg-neutral-200" />

                <div className="flex items-center space-x-2 text-neutral-500">
                    <button className="p-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-900 transition-all">
                        <Layers size={18} />
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-3 py-1.5 bg-neutral-100 rounded-xl">
                    <button className="p-1.5 rounded-lg hover:bg-white text-neutral-500 transition-all">
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-black text-neutral-800 italic">100%</span>
                    <button className="p-1.5 rounded-lg hover:bg-white text-neutral-500 transition-all">
                        <ZoomIn size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
