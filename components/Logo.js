"use client";

export default function Logo({ size = "default", className = "" }) {
  const sizes = {
    small: { wrapper: "w-8 h-8", text: "text-lg" },
    default: { wrapper: "w-10 h-10", text: "text-xl" },
    large: { wrapper: "w-14 h-14", text: "text-2xl" },
    hero: { wrapper: "w-20 h-20", text: "text-4xl" },
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${s.wrapper} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer shield shape with gradient */}
          <defs>
            <linearGradient id="shieldGrad" x1="8" y1="4" x2="40" y2="44">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="14" y1="10" x2="34" y2="38">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="shadowFilter" x="-2" y="-1" width="52" height="52">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Main shield body */}
          <path
            d="M24 4L8 10V22C8 33.1 14.84 43.38 24 46C33.16 43.38 40 33.1 40 22V10L24 4Z"
            fill="url(#shieldGrad)"
            filter="url(#shadowFilter)"
          />

          {/* Inner shield highlight */}
          <path
            d="M24 8L12 13V22C12 31.08 17.56 39.52 24 41.8C30.44 39.52 36 31.08 36 22V13L24 8Z"
            fill="url(#innerGrad)"
            opacity="0.3"
          />

          {/* Checkmark/document icon inside */}
          <path
            d="M18 20H30V22H18V20Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M18 25H28V27H18V25Z"
            fill="white"
            opacity="0.7"
          />
          <path
            d="M18 30H24V32H18V30Z"
            fill="white"
            opacity="0.5"
          />
          
          {/* Checkmark accent */}
          <path
            d="M30 28L33 31L37 25"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <span
        className={`${s.text} font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent`}
      >
        SignSafe
      </span>
    </div>
  );
}

export function LogoMark({ size = 36, className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="shieldGradMark" x1="8" y1="4" x2="40" y2="44">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="innerGradMark" x1="14" y1="10" x2="34" y2="38">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L8 10V22C8 33.1 14.84 43.38 24 46C33.16 43.38 40 33.1 40 22V10L24 4Z"
        fill="url(#shieldGradMark)"
      />
      <path
        d="M24 8L12 13V22C12 31.08 17.56 39.52 24 41.8C30.44 39.52 36 31.08 36 22V13L24 8Z"
        fill="url(#innerGradMark)"
        opacity="0.3"
      />
      <path d="M18 20H30V22H18V20Z" fill="white" opacity="0.9" />
      <path d="M18 25H28V27H18V25Z" fill="white" opacity="0.7" />
      <path d="M18 30H24V32H18V30Z" fill="white" opacity="0.5" />
      <path
        d="M30 28L33 31L37 25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
