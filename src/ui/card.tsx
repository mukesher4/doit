export default function Card({ className, title, description, icon }: { className?: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <div
    className={`
      ${className}
      p-4
      flex flex-col
      h-64 w-64
      border border-2 border-[#808080]
      bg-[#0D0D0D]
      rounded-[25px]

      outline outline-2 outline-[#4D4D4D]
      outline-offset-4

      bg-[radial-gradient(circle_at_center,#070707_0%,#070707_58%)]
      bg-cover bg-center
    `}
  >
    <div className="h-[63%] w-full flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1 w-full flex flex-col gap-1">
      <span className="text-white text-lg font-semibold">
        {title}
      </span>
      <span className="text-white/45 text-[11px]">
        {description}
      </span>
    </div>
  </div>
  )
}