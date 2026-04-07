import { useEffect, useRef, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const p2pItems = [
  { text: "Нет зависимости от курса — зарабатываешь всегда", icon: "TrendingUp" },
  { text: "Минимальный стартовый капитал от 10 000 \u20BD", icon: "Wallet" },
  { text: "Понятно новичку — пошаговые инструкции", icon: "BookOpen" },
  { text: "Доход 3\u20138% с каждой сделки", icon: "Percent" },
  { text: "2\u20133 часа в день", icon: "Clock" },
  { text: "Защищённые схемы входа и выхода", icon: "ShieldCheck" },
]

const tradingItems = [
  { text: "Зависишь от рынка — можно потерять всё", icon: "TrendingDown" },
  { text: "Нужен большой капитал для ощутимой прибыли", icon: "Banknote" },
  { text: "Сложно, требует многолетнего опыта", icon: "GraduationCap" },
  { text: "Доход непредсказуем, убытки — норма", icon: "CircleAlert" },
  { text: "Постоянный мониторинг рынка 24/7", icon: "Eye" },
  { text: "Высокий риск ликвидации позиции", icon: "Flame" },
]

export function ComparisonSection() {
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
    <section ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Почему именно P2P
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            P2P Арбитраж vs Обычный трейдинг
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Большинство трейдеров теряют деньги. P2P арбитраж — это другая игра.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <div
            className={`group relative rounded-2xl transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/25 via-red-500/5 to-transparent opacity-100 group-hover:from-red-500/40 group-hover:via-red-500/10 transition-all duration-500" />

            <div className="relative glass-card rounded-2xl p-8 h-full">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <Icon name="Check" size={20} className="text-red-400" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white">P2P Арбитраж</h3>
              </div>

              <div className="space-y-4">
                {p2pItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: visible ? `${200 + i * 80}ms` : "0ms" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-emerald-400" />
                    </div>
                    <div className="flex items-start gap-2 min-w-0">
                      <Icon name={item.icon} size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="font-geist text-sm text-gray-200 leading-relaxed">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`group relative rounded-2xl transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-100 group-hover:from-white/[0.1] transition-all duration-500" />

            <div className="relative glass-card rounded-2xl p-8 h-full">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="X" size={20} className="text-gray-500" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-gray-400">Обычный трейдинг</h3>
              </div>

              <div className="space-y-4">
                {tradingItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: visible ? `${200 + i * 80}ms` : "0ms" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="X" size={12} className="text-red-400/60" />
                    </div>
                    <div className="flex items-start gap-2 min-w-0">
                      <Icon name={item.icon} size={15} className="text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="font-geist text-sm text-gray-500 leading-relaxed line-through decoration-gray-700">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10" />
            <div className="absolute inset-0 glass-card" />

            <div className="relative px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 text-center md:text-left">
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={22} className="text-red-400" />
                </div>
                <div>
                  <h4 className="font-orbitron text-lg font-bold text-white mb-1.5">Вывод</h4>
                  <p className="font-geist text-gray-400 text-sm leading-relaxed max-w-lg">
                    P2P арбитраж — это предсказуемый доход без рисков обычного трейдинга. Ты не угадываешь рынок, а работаешь с математически выверенными связками.
                  </p>
                </div>
              </div>

              <a href="#register" className="flex-shrink-0">
                <button className="bg-red-500 hover:bg-red-600 text-white font-geist font-semibold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_35px_rgba(239,68,68,0.4)] flex items-center gap-2">
                  Выбрать P2P арбитраж
                  <Icon name="ArrowRight" size={16} />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
