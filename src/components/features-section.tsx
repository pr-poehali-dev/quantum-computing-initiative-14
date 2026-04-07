import { useEffect, useRef, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const features = [
  {
    title: "Сигналы в реальном времени",
    description:
      "Получай точные арбитражные сигналы с указанием биржи, пары и спреда. Успей раньше рынка.",
    icon: "Zap",
    badge: "Live",
  },
  {
    title: "Защита капитала",
    description:
      "Проверенные схемы входа и выхода с минимальными рисками. Торгуй только с подтверждёнными связками.",
    icon: "ShieldCheck",
    badge: "Безопасно",
  },
  {
    title: "Обучение с нуля",
    description:
      "Пошаговые инструкции для новичков: от регистрации на бирже до первой прибыли за 7 дней.",
    icon: "GraduationCap",
    badge: "Новичкам",
  },
  {
    title: "Умный трекер прибыли",
    description:
      "Автоматический подсчёт доходности по каждой связке. Знай свою реальную прибыль в любой момент.",
    icon: "BarChart3",
    badge: "Аналитика",
  },
  {
    title: "Закрытое сообщество",
    description:
      "Опытные трейдеры делятся связками, лайфхаками и стратегиями в закрытом чате каждый день.",
    icon: "MessageCircle",
    badge: "Сообщество",
  },
  {
    title: "Мультибиржевые связки",
    description:
      "Работаем с Binance, Bybit, OKX, Garantex и 20+ другими площадками для максимального охвата.",
    icon: "Target",
    badge: "20+ бирж",
  },
]

function FeatureCard({
  title,
  description,
  icon,
  badge,
  index,
  visible,
  large,
}: {
  title: string
  description: string
  icon: string
  badge: string
  index: number
  visible: boolean
  large: boolean
}) {
  return (
    <div
      className={`group relative glass-card rounded-2xl transition-all duration-700 hover:scale-[1.02] ${
        large ? "p-8 md:p-10" : "p-6 md:p-8"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(239,68,68,0.15), transparent 40%, transparent 60%, rgba(239,68,68,0.1))",
        }}
      />

      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/60 transition-all duration-500" />

      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <div className={`${large ? "w-14 h-14" : "w-12 h-12"} rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] transition-all duration-300`}>
            <Icon name={icon} size={large ? 26 : 22} className="text-red-400 group-hover:text-red-300 transition-colors duration-300" />
          </div>
          <span className="font-geist text-[10px] uppercase tracking-widest text-red-400/80 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full font-medium">
            {badge}
          </span>
        </div>

        <h3 className={`font-orbitron font-bold text-white mb-3 group-hover:text-red-50 transition-colors duration-300 ${large ? "text-xl md:text-2xl" : "text-lg"}`}>
          {title}
        </h3>

        <p className={`font-geist text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 ${large ? "text-base" : "text-sm"}`}>
          {description}
        </p>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <section id="features" ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Инструменты
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Всё для стабильного заработка
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Инструменты и знания, которые нужны как новичку, так и опытному трейдеру
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="lg:col-span-2">
            <FeatureCard {...features[0]} index={0} visible={visible} large={true} />
          </div>
          <div className="lg:col-span-2">
            <FeatureCard {...features[1]} index={1} visible={visible} large={true} />
          </div>
          <div className="lg:col-span-1">
            <FeatureCard {...features[2]} index={2} visible={visible} large={false} />
          </div>
          <div className="lg:col-span-1">
            <FeatureCard {...features[3]} index={3} visible={visible} large={false} />
          </div>
          <div className="lg:col-span-1">
            <FeatureCard {...features[4]} index={4} visible={visible} large={false} />
          </div>
          <div className="lg:col-span-1">
            <FeatureCard {...features[5]} index={5} visible={visible} large={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
