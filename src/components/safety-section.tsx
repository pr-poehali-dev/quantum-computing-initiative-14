import Icon from "@/components/ui/icon"

const safetyItems = [
  {
    icon: "Shield",
    title: "Защита от блокировок",
    description: "Используем проверенные схемы работы, которые полностью соответствуют правилам бирж. Более 2 400 участников работают без единой блокировки.",
  },
  {
    icon: "Lock",
    title: "Анонимность сделок",
    description: "P2P торговля не требует раскрытия личных данных контрагентам. Ваши средства и личность надёжно защищены.",
  },
  {
    icon: "Eye",
    title: "Прозрачность заработка",
    description: "Вся история сделок хранится на бирже. Вы всегда видите откуда пришли деньги и можете подтвердить источник дохода.",
  },
  {
    icon: "Zap",
    title: "Гарантия сделки",
    description: "Биржевой эскроу удерживает средства продавца до подтверждения оплаты. Мошенничество технически невозможно.",
  },
  {
    icon: "TrendingUp",
    title: "Рыночный риск = 0",
    description: "В отличие от трейдинга, арбитраж не зависит от направления рынка. Зарабатываете и на росте, и на падении.",
  },
  {
    icon: "Users",
    title: "Поддержка 24/7",
    description: "Личный куратор отвечает в течение 15 минут. Никогда не остаётесь один на один с проблемой.",
  },
]

export function SafetySection() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3 font-orbitron">Безопасность</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Почему это надёжно</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            P2P арбитраж — один из самых безопасных способов работы с криптовалютой. Вот почему.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyItems.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-red-500/40 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors duration-300">
                <Icon name={item.icon} size={22} className="text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2 font-orbitron">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5 p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {[
              { value: "0", label: "блокировок за всё время" },
              { value: "100%", label: "сделок завершены успешно" },
              { value: "2 400+", label: "активных участников" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-red-500 font-orbitron">{stat.value}</div>
                <div className="text-zinc-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}