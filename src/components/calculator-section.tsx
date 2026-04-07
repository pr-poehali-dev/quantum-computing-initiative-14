import { useState } from "react"
import Icon from "@/components/ui/icon"

const SPREAD_OPTIONS = [3, 5, 8]
const TURNOVER_OPTIONS = [3, 5, 10]

export function CalculatorSection() {
  const [capital, setCapital] = useState(50000)
  const [spread, setSpread] = useState(5)
  const [turnoversPerDay, setTurnoversPerDay] = useState(5)
  const [period, setPeriod] = useState(30)

  const dailyProfit = capital * (spread / 100) * turnoversPerDay
  const periodProfit = dailyProfit * period
  const totalCapital = capital + periodProfit
  const roi = ((periodProfit / capital) * 100).toFixed(0)

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n)

  return (
    <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-red-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3 font-orbitron">Калькулятор</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Посчитай свой доход</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Введи свои параметры и увидишь, сколько реально можно заработать на P2P арбитраже
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-8">
            {/* Capital */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-zinc-300 text-sm font-medium">Стартовый капитал</label>
                <span className="text-red-400 font-bold font-orbitron text-base">{formatMoney(capital)}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={1000000}
                step={10000}
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>10 000 ₽</span>
                <span>1 000 000 ₽</span>
              </div>
            </div>

            {/* Spread */}
            <div>
              <label className="text-zinc-300 text-sm font-medium block mb-3">Спред (% с оборота)</label>
              <div className="flex gap-3">
                {SPREAD_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpread(s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold font-orbitron transition-all duration-200 ${
                      spread === s
                        ? "bg-red-500 text-white border border-red-500"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-red-500/50"
                    }`}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>

            {/* Turnovers */}
            <div>
              <label className="text-zinc-300 text-sm font-medium block mb-3">Оборотов в день</label>
              <div className="flex gap-3">
                {TURNOVER_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTurnoversPerDay(t)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold font-orbitron transition-all duration-200 ${
                      turnoversPerDay === t
                        ? "bg-red-500 text-white border border-red-500"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-red-500/50"
                    }`}
                  >
                    {t}x
                  </button>
                ))}
              </div>
            </div>

            {/* Period */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-zinc-300 text-sm font-medium">Период работы</label>
                <span className="text-red-400 font-bold font-orbitron text-base">{period} дней</span>
              </div>
              <input
                type="range"
                min={7}
                max={90}
                step={1}
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>7 дней</span>
                <span>90 дней</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-500/10 to-zinc-900/60 p-8 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="TrendingUp" size={20} className="text-red-500" />
                <span className="text-zinc-400 text-sm uppercase tracking-widest font-orbitron">Результат за {period} дней</span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                  <span className="text-zinc-400 text-sm">Доход в день</span>
                  <span className="text-white font-bold text-base font-orbitron">{formatMoney(dailyProfit)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                  <span className="text-zinc-400 text-sm">Доход за период</span>
                  <span className="text-green-400 font-bold text-base font-orbitron">{formatMoney(periodProfit)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                  <span className="text-zinc-400 text-sm">Итоговый капитал</span>
                  <span className="text-white font-bold text-base font-orbitron">{formatMoney(totalCapital)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-400 text-sm">Рост капитала</span>
                  <span className="text-red-500 font-extrabold text-2xl font-orbitron">+{roi}%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={18} className="text-red-500" />
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Расчёт основан на реальных показателях участников. Спред 3–5% — консервативный сценарий, 8% — активная работа с несколькими биржами.
              </p>
            </div>

            <a href="#register" className="block">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] font-orbitron">
                Начать зарабатывать →
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
