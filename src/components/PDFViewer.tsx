import { ChevronUp, ChevronDown, Maximize2, Download, X } from 'lucide-react';
import { useState } from 'react';

type PDFViewerProps = {
  pdfUrl: string;
  title: string;
  onClose: () => void;
};

function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' ? Math.min(zoom + 25, 300) : Math.max(zoom - 25, 50);
    setZoom(newZoom);
  };

  const containerClass = isFullscreen ? 'fixed inset-0 z-50' : 'rounded-3xl border border-slate-200 dark:border-slate-800';

  return (
    <div className={`${containerClass} flex flex-col overflow-hidden bg-slate-900 dark:bg-slate-950`}>
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{zoom}%</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom('out')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition hover:bg-slate-700"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleZoom('in')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition hover:bg-slate-700"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition hover:bg-slate-700"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
          <a
            href={pdfUrl}
            download
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white transition hover:bg-sky-700"
          >
            <Download className="h-5 w-5" />
          </a>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-slate-900 p-4">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="mx-auto transition-transform duration-200"
        >
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&statusbar=0`}
            className="h-screen w-full border-0"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
