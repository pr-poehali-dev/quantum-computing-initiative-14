import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 2400, suffix: "+", label: "Участников платформы", icon: "👥" },
  { value: 187, suffix: " млн ₽", label: "Заработано участниками", icon: "💰" },
  { value: 94, suffix: "%", label: "Участников вышли в плюс", icon: "📈" },
  { value: 20, suffix: "+", label: "Бирж в нашей системе", icon: "🏦" },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

function StatCard({ value, suffix, label, icon, animate }: { value: number; suffix: string; label: string; icon: string; animate: boolean }) {
  const count = useCountUp(value, 2000, animate)

  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-900 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 group">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-extrabold text-red-500 font-orbitron mb-2">
        {count.toLocaleString("ru-RU")}{suffix}
      </div>
      <div className="text-sm text-zinc-400 font-medium leading-tight">{label}</div>
    </div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 px-6 bg-black border-y border-red-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3 font-orbitron">Цифры говорят сами</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Платформа, которой доверяют</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
