import { useEffect, useRef, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const exchanges = [
  { name: "Binance", icon: "CircleDollarSign" },
  { name: "Bybit", icon: "ArrowLeftRight" },
  { name: "OKX", icon: "Repeat" },
  { name: "Garantex", icon: "Shield" },
  { name: "WhiteBIT", icon: "Zap" },
  { name: "MEXC", icon: "BarChart3" },
  { name: "Huobi", icon: "Gem" },
  { name: "KuCoin", icon: "Coins" },
  { name: "Gate.io", icon: "Lock" },
  { name: "Bitget", icon: "TrendingUp" },
  { name: "HTX", icon: "Activity" },
  { name: "BingX", icon: "Layers" },
]

const row1 = exchanges.slice(0, 6)
const row2 = exchanges.slice(6, 12)

function ExchangePill({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:border-red-500/30 transition-all duration-300 group cursor-default">
      <div className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.2)] transition-all duration-300">
        <Icon name={icon} size={14} className="text-red-400 group-hover:text-red-300 transition-colors duration-300" />
      </div>
      <span className="font-geist text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: typeof exchanges
  reverse?: boolean
  duration: string
}) {
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? "tickerReverse" : "ticker"} ${duration} linear infinite`,
        }}
      >
        {doubled.map((exchange, i) => (
          <ExchangePill key={`${exchange.name}-${i}`} name={exchange.name} icon={exchange.icon} />
        ))}
      </div>
    </div>
  )
}

export function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <section ref={ref} className="relative py-20 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <style>{`
        @keyframes tickerReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <div className="relative">
        <div
          className={`text-center mb-12 px-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Партнёры
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
            Работаем с лучшими биржами
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Icon name="Building2" size={16} className="text-red-400" />
            </div>
            <span className="font-space-mono text-sm text-gray-400">
              <span className="text-white font-bold">12+</span> бирж в нашей системе
            </span>
          </div>
        </div>

        <div
          className={`space-y-4 transition-all duration-700 delay-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <MarqueeRow items={row1} duration="35s" />
          <MarqueeRow items={row2} reverse duration="40s" />
        </div>
      </div>
    </section>
  )
}
