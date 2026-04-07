import { useEffect, useRef, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const stats = [
  { value: 2400, suffix: "+", label: "Участников платформы", icon: "Users" },
  { value: 187, suffix: " млн ₽", label: "Заработано участниками", icon: "TrendingUp" },
  { value: 94, suffix: "%", label: "Участников вышли в плюс", icon: "BarChart3" },
  { value: 20, suffix: "+", label: "Бирж в нашей системе", icon: "Building2" },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let animationId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        animationId = requestAnimationFrame(step)
      }
    }

    animationId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationId)
  }, [target, duration, start])

  return count
}

function StatCard({
  value,
  suffix,
  label,
  icon,
  animate,
  index,
}: {
  value: number
  suffix: string
  label: string
  icon: string
  animate: boolean
  index: number
}) {
  const count = useCountUp(value, 2200, animate)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!animate) return
    const timer = setTimeout(() => setVisible(true), index * 150)
    return () => clearTimeout(timer)
  }, [animate, index])

  return (
    <div
      className={`glass-card relative rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-700 hover:scale-[1.03] group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />

      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300">
        <Icon name={icon} size={22} className="text-red-400" />
      </div>

      <div className="text-4xl md:text-5xl font-extrabold font-orbitron mb-3 gradient-text-red">
        {count.toLocaleString("ru-RU")}{suffix}
      </div>

      <div className="font-geist text-sm text-gray-400 font-medium leading-tight">{label}</div>
    </div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setAnimate(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <section ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Цифры говорят сами
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Платформа, которой доверяют
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} animate={animate} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
