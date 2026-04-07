import { useState, useEffect, useRef, useCallback } from "react"
import Icon from "@/components/ui/icon"

const SPREAD_OPTIONS = [3, 5, 8]
const TURNOVER_OPTIONS = [3, 5, 10]

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number>(0)
  const startRef = useRef(target)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = display
    startTimeRef.current = null

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(startRef.current + (target - startRef.current) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

function MiniBarChart({ dailyProfit, period }: { dailyProfit: number; period: number }) {
  const bars = Array.from({ length: 7 }, (_, i) => {
    const day = Math.round(((i + 1) / 7) * period)
    const cumulative = dailyProfit * day
    return { day, value: cumulative }
  })
  const maxValue = bars[bars.length - 1]?.value || 1

  return (
    <div className="flex items-end gap-1.5 h-20 mt-2">
      {bars.map((bar, i) => {
        const heightPercent = Math.max(8, (bar.value / maxValue) * 100)
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-red-500 to-red-400 transition-all duration-500 relative group"
              style={{ height: `${heightPercent}%` }}
            >
              <div className="absolute inset-0 rounded-t-md bg-red-400/0 group-hover:bg-red-400/20 transition-all duration-300" />
            </div>
            <span className="font-space-mono text-[9px] text-gray-600">
              {bar.day}д
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function CalculatorSection() {
  const [capital, setCapital] = useState(50000)
  const [spread, setSpread] = useState(5)
  const [turnoversPerDay, setTurnoversPerDay] = useState(5)
  const [period, setPeriod] = useState(30)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  const dailyProfit = capital * (spread / 100) * turnoversPerDay
  const periodProfit = dailyProfit * period
  const totalCapital = capital + periodProfit
  const roi = Math.round((periodProfit / capital) * 100)

  const animatedDaily = useAnimatedNumber(dailyProfit)
  const animatedPeriod = useAnimatedNumber(periodProfit)
  const animatedTotal = useAnimatedNumber(totalCapital)
  const animatedRoi = useAnimatedNumber(roi)

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n)

  return (
    <section ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute inset-0 bg-gradient-to-tl from-red-500/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2);
          transition: box-shadow 0.3s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2);
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.1));
        }
        input[type="range"]::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.1));
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Калькулятор
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Посчитай свой доход
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Введи свои параметры и увидишь, сколько реально можно заработать на P2P арбитраже
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.03] pointer-events-none" />
              <div className="relative glass-card rounded-2xl p-8 space-y-8">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-geist text-gray-300 text-sm font-medium flex items-center gap-2">
                      <Icon name="Wallet" size={14} className="text-gray-500" />
                      Стартовый капитал
                    </label>
                    <span className="font-orbitron text-red-400 font-bold text-sm">{formatMoney(capital)}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={capital}
                    onChange={(e) => setCapital(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-transparent"
                  />
                  <div className="flex justify-between font-space-mono text-[10px] text-gray-600 mt-2">
                    <span>10 000 \u20BD</span>
                    <span>1 000 000 \u20BD</span>
                  </div>
                </div>

                <div>
                  <label className="font-geist text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
                    <Icon name="Percent" size={14} className="text-gray-500" />
                    Спред (% с оборота)
                  </label>
                  <div className="flex gap-3 mt-3">
                    {SPREAD_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpread(s)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold font-orbitron transition-all duration-300 ${
                          spread === s
                            ? "bg-red-500 text-white border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                            : "bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:border-red-500/40 hover:bg-white/[0.05]"
                        }`}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-geist text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
                    <Icon name="Repeat" size={14} className="text-gray-500" />
                    Оборотов в день
                  </label>
                  <div className="flex gap-3 mt-3">
                    {TURNOVER_OPTIONS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTurnoversPerDay(t)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold font-orbitron transition-all duration-300 ${
                          turnoversPerDay === t
                            ? "bg-red-500 text-white border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                            : "bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:border-red-500/40 hover:bg-white/[0.05]"
                        }`}
                      >
                        {t}x
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-geist text-gray-300 text-sm font-medium flex items-center gap-2">
                      <Icon name="Calendar" size={14} className="text-gray-500" />
                      Период работы
                    </label>
                    <span className="font-orbitron text-red-400 font-bold text-sm">{period} дней</span>
                  </div>
                  <input
                    type="range"
                    min={7}
                    max={90}
                    step={1}
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-transparent"
                  />
                  <div className="flex justify-between font-space-mono text-[10px] text-gray-600 mt-2">
                    <span>7 дней</span>
                    <span>90 дней</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative flex-1">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10 pointer-events-none" />
              <div className="relative glass-card rounded-2xl p-8 h-full">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} className="text-red-400" />
                  </div>
                  <span className="font-orbitron text-gray-400 text-xs uppercase tracking-widest">
                    Результат за {period} дней
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center py-3.5 border-b border-white/[0.05]">
                    <span className="font-geist text-gray-400 text-sm">Доход в день</span>
                    <span className="font-orbitron text-white font-bold text-sm">{formatMoney(animatedDaily)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3.5 border-b border-white/[0.05]">
                    <span className="font-geist text-gray-400 text-sm">Доход за период</span>
                    <span className="font-orbitron text-emerald-400 font-bold text-sm">{formatMoney(animatedPeriod)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3.5 border-b border-white/[0.05]">
                    <span className="font-geist text-gray-400 text-sm">Итоговый капитал</span>
                    <span className="font-orbitron text-white font-bold text-sm">{formatMoney(animatedTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3.5">
                    <span className="font-geist text-gray-400 text-sm">Рост капитала</span>
                    <span className="font-orbitron text-2xl font-extrabold gradient-text-red" style={{ textShadow: "0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.15)" }}>
                      +{animatedRoi}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <p className="font-geist text-[11px] text-gray-500 mb-1">Рост дохода по дням</p>
                  <MiniBarChart dailyProfit={dailyProfit} period={period} />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={16} className="text-red-400" />
              </div>
              <p className="font-geist text-gray-500 text-xs leading-relaxed">
                Расчёт основан на реальных показателях участников. Спред 3\u20135% \u2014 консервативный сценарий, 8% \u2014 активная работа с несколькими биржами.
              </p>
            </div>

            <a href="#register" className="block">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-orbitron font-bold py-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2">
                Начать зарабатывать
                <Icon name="ArrowRight" size={18} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
