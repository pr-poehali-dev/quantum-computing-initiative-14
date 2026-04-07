import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const floatingShapes = [
  { type: "circle", size: "w-32 h-32", top: "top-[8%]", left: "left-[5%]", delay: "0s", duration: "8s", opacity: "opacity-[0.03]" },
  { type: "square", size: "w-20 h-20", top: "top-[15%]", left: "left-[80%]", delay: "1s", duration: "7s", opacity: "opacity-[0.04]" },
  { type: "circle", size: "w-16 h-16", top: "top-[60%]", left: "left-[10%]", delay: "2s", duration: "9s", opacity: "opacity-[0.03]" },
  { type: "square", size: "w-24 h-24", top: "top-[70%]", left: "left-[85%]", delay: "0.5s", duration: "6s", opacity: "opacity-[0.04]" },
  { type: "circle", size: "w-12 h-12", top: "top-[40%]", left: "left-[90%]", delay: "3s", duration: "8s", opacity: "opacity-[0.05]" },
  { type: "square", size: "w-14 h-14", top: "top-[80%]", left: "left-[40%]", delay: "1.5s", duration: "7s", opacity: "opacity-[0.03]" },
  { type: "circle", size: "w-10 h-10", top: "top-[25%]", left: "left-[50%]", delay: "2.5s", duration: "10s", opacity: "opacity-[0.04]" },
  { type: "square", size: "w-28 h-28", top: "top-[50%]", left: "left-[20%]", delay: "4s", duration: "9s", opacity: "opacity-[0.02]" },
]

const exchanges = [
  { name: "Binance", icon: "CircleDollarSign" },
  { name: "Bybit", icon: "ArrowLeftRight" },
  { name: "OKX", icon: "Repeat" },
  { name: "Garantex", icon: "Shield" },
  { name: "Huobi", icon: "Gem" },
  { name: "KuCoin", icon: "Coins" },
]

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [spots, setSpots] = useState(7)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  useEffect(() => {
    if (!visible) return
    const timer = setInterval(() => {
      setSpots((prev) => (prev > 3 ? prev - 1 : prev))
    }, 12000)
    return () => clearInterval(timer)
  }, [visible])

  return (
    <section ref={ref} className="relative py-28 md:py-36 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.04)_0%,transparent_50%)]" />

      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute ${shape.size} ${shape.top} ${shape.left} ${shape.opacity} animate-float border border-red-500/20 ${
              shape.type === "circle" ? "rounded-full" : "rounded-lg rotate-12"
            }`}
            style={{ animationDelay: shape.delay, animationDuration: shape.duration }}
          />
        ))}
      </div>

      <div
        className={`relative max-w-4xl mx-auto text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-geist text-sm text-red-300">
            Осталось <span className="font-bold text-white">{spots}</span> мест в этом месяце
          </span>
        </div>

        <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Начни зарабатывать</span>
          <br />
          <span className="gradient-text-red">уже сегодня</span>
        </h2>

        <p
          className={`font-geist text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Присоединяйся к тысячам трейдеров, которые уже зарабатывают на P2P арбитраже.
          Старт с любым бюджетом — обучение, сигналы и поддержка куратора включены.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-14 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a href="https://t.me/+7eoNYNT4wKNmMWUy" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="relative bg-red-500 hover:bg-red-600 text-white font-geist font-semibold text-lg px-10 py-6 border-0 gap-2.5 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all duration-300 pulse-button"
            >
              <Icon name="Send" size={20} />
              Начать бесплатно
            </Button>
          </a>
          <a href="https://t.me/+7eoNYNT4wKNmMWUy" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-transparent border border-white/10 text-gray-300 hover:text-white hover:border-red-500/40 hover:bg-white/5 font-geist text-lg px-10 py-6 gap-2.5 transition-all duration-300"
            >
              <Icon name="MessageCircle" size={20} />
              Узнать подробнее
            </Button>
          </a>
        </div>

        <div
          className={`transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-geist text-xs text-gray-500 uppercase tracking-widest mb-4">
            Работаем с ведущими биржами
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {exchanges.map((exchange, i) => (
              <div
                key={i}
                className="group flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 hover:border-red-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Icon
                  name={exchange.icon}
                  size={16}
                  className="text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                />
                <span className="font-geist text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {exchange.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
