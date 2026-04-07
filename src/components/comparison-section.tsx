const p2pItems = [
  { text: "Нет зависимости от курса — зарабатываешь всегда" },
  { text: "Минимальный стартовый капитал от 10 000 ₽" },
  { text: "Понятно новичку — пошаговые инструкции" },
  { text: "Доход 3–8% с каждой сделки" },
  { text: "2–3 часа в день" },
  { text: "Защищённые схемы входа и выхода" },
]

const tradingItems = [
  { text: "Зависишь от рынка — можно потерять всё" },
  { text: "Нужен большой капитал для ощутимой прибыли" },
  { text: "Сложно, требует многолетнего опыта" },
  { text: "Доход непредсказуем, убытки — норма" },
  { text: "Постоянный мониторинг рынка 24/7" },
  { text: "Высокий риск ликвидации позиции" },
]

export function ComparisonSection() {
  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3 font-orbitron">Почему именно P2P</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">P2P Арбитраж vs Обычный трейдинг</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Большинство трейдеров теряют деньги. P2P арбитраж — это другая игра.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* P2P */}
          <div className="rounded-2xl border border-red-500/40 bg-gradient-to-b from-red-500/5 to-transparent p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">✓</div>
              <h3 className="text-xl font-bold text-white font-orbitron">P2P Арбитраж</h3>
            </div>
            <div className="space-y-4">
              {p2pItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5 text-lg leading-none">●</span>
                  <span className="text-zinc-200 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Обычный трейдинг */}
          <div className="rounded-2xl border border-zinc-700/40 bg-gradient-to-b from-zinc-800/20 to-transparent p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-lg">✗</div>
              <h3 className="text-xl font-bold text-zinc-400 font-orbitron">Обычный трейдинг</h3>
            </div>
            <div className="space-y-4">
              {tradingItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-zinc-600 mt-0.5 text-lg leading-none">●</span>
                  <span className="text-zinc-500 text-sm leading-relaxed line-through decoration-zinc-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="#register">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 pulse-button font-orbitron">
              Выбрать P2P арбитраж →
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
