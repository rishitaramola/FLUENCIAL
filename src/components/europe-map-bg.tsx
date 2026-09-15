export function EuropeMapBg() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[120%] h-[120%] max-w-none text-indigo-900"
      >
        {/* Subtle stylized European continent outline & map paths */}
        <g stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
          {/* France / Western Europe outline */}
          <path d="M 320 280 Q 360 250 400 270 T 450 320 T 410 380 T 340 370 Z" fill="currentColor" fillOpacity="0.15" />
          {/* Germany / Central Europe */}
          <path d="M 410 230 Q 460 210 500 240 T 510 300 T 450 310 Z" fill="currentColor" fillOpacity="0.15" />
          {/* Mediterranean connection */}
          <path d="M 370 380 Q 420 420 460 410 T 430 460 Z" fill="currentColor" fillOpacity="0.1" />
          {/* UK / North */}
          <path d="M 300 200 Q 330 180 340 210 T 310 240 Z" fill="currentColor" fillOpacity="0.1" />
        </g>
        {/* Flight / Language Network Nodes */}
        <g fill="currentColor">
          <circle cx="370" cy="330" r="4" className="animate-ping opacity-75" />
          <circle cx="370" cy="330" r="4" />
          <circle cx="450" cy="260" r="4" />
          <circle cx="480" cy="320" r="3" />
          <circle cx="320" cy="220" r="3" />
          <path d="M 370 330 Q 410 295 450 260" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 370 330 Q 345 275 320 220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  )
}
