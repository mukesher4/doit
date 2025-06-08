export default function GroupIcon({ mainColor = "#fff", secondaryColor = "#888", size = 120, strokeWidth = 8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="28" r="18" stroke={secondaryColor} strokeWidth={strokeWidth} />
      <path d="M12 70 Q30 55 48 70" stroke={secondaryColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      <circle cx="90" cy="28" r="18" stroke={secondaryColor} strokeWidth={strokeWidth} />
      <path d="M72 70 Q90 55 108 70" stroke={secondaryColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      <circle cx="60" cy="20" r="20" stroke={mainColor} strokeWidth={strokeWidth} />
      <path d="M30 70 Q60 45 90 70" stroke={mainColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  )
}