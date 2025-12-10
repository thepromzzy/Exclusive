import React from "react"

interface SectionHeaderProps {
  label: string
  title: string
  showTimer?: boolean
  timerEnd?: Date
  showNav?: boolean
}

export default function SectionHeader({ label, title, showTimer = false, showNav = false }: SectionHeaderProps) {
  // Simple countdown - in production would use actual timer logic
  const timeLeft = { days: 3, hours: 23, minutes: 19, seconds: 56 }

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-5 h-10 bg-primary rounded" />
          <span className="text-primary font-semibold">{label}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground">{title}</h2>

          {showTimer && (
            <div className="flex items-center gap-4">
              {Object.entries(timeLeft).map(([key, value], idx) => (
                <React.Fragment key={key}>
                  <div className="text-center">
                    <span className="text-xs text-foreground block capitalize">{key}</span>
                    <span className="text-2xl md:text-3xl font-bold text-foreground">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  {idx < 3 && <span className="text-2xl text-primary font-bold">:</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {showNav && (
        <div className="flex gap-2">
          <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
