"use client"
export default function LogInCard({ className }: {className: string}) {
    return (
      <div
      className={`
        ${className}
        p-4
        flex flex-col
        w-128
        border border-2 border-[#808080]
        bg-[#0D0D0D]
        rounded-[25px]
  
        outline outline-2 outline-[#4D4D4D]
        outline-offset-4
  
        bg-[radial-gradient(circle_at_center,#070707_0%,#070707_58%)]
        bg-cover bg-center
      `}
    >
      <div className="flex-1 w-full flex flex-col gap-1">
        <span className="text-white text-2xl font-semibold">
          Log In Using Your Existing Account
        </span>
        <span className="text-white/45 text-[14px]">
          Use Your X Account to Log In into Doit for exciting features!
        </span>
      </div>
      <div
      onClick={() => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
      }}
      className="cursor-pointer hover:bg-white/90 transition-all duration-200 w-full h-12 rounded-[10px] bg-white text-black font-semibold text-lg items-center justify-center flex">
        Login with X
      </div>
    </div>
    )
  }