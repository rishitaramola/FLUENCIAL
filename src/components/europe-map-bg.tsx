export function EuropeMapBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
      <svg
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[150vh] min-h-[800px] w-auto max-w-none text-studio"
      >
        <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Europe body */}
          <path d="M 250 150 Q 350 100 450 120 T 600 200 T 650 350 T 550 500 T 400 550 T 280 450 T 200 300 Z" fill="currentColor" fillOpacity="0.05" />
          {/* France / West Europe focus */}
          <path d="M 320 300 Q 380 260 420 320 T 360 420 Z" fill="currentColor" fillOpacity="0.1" />
        </g>
        
        {/* Subtle Network Nodes */}
        <g fill="currentColor">
          <circle cx="370" cy="340" r="3" className="animate-pulse opacity-70" />
          <circle cx="450" cy="280" r="2" opacity="0.6" />
          <circle cx="520" cy="380" r="2" opacity="0.5" />
          <circle cx="310" cy="240" r="2" opacity="0.4" />
          <circle cx="280" cy="380" r="1.5" opacity="0.4" />
          <circle cx="480" cy="180" r="1.5" opacity="0.3" />
          
          <path d="M 370 340 Q 410 310 450 280" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 370 340 Q 340 290 310 240" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 450 280 Q 485 330 520 380" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 370 340 Q 325 360 280 380" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  )
}
