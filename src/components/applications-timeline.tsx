import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "Шаг 1: Старт с нуля",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Регистрируешься на платформе, проходишь верификацию на биржах и изучаешь базовые принципы P2P арбитража.
            Первые сделки — с минимальным капиталом от 10 000 рублей.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Регистрация и верификация на биржах за 1 день
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Пошаговые видеоинструкции для новичков
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Первая сделка уже в день старта
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Шаг 2: Первая прибыль",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Работаешь по готовым арбитражным связкам. Сигналы поступают в реальном времени — ты просто исполняешь
            сделки и фиксируешь прибыль 3-8% с каждого оборота.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Готовые связки с расчётом спреда
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Доходность 3-8% с каждого оборота
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Поддержка куратора в любой момент
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Шаг 3: Масштабирование",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            После освоения базовых связок переходишь к сложным межбиржевым схемам с большим капиталом.
            Опытные трейдеры зарабатывают от 150 000 до 500 000 рублей в месяц.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Межбиржевые и межвалютные схемы
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Работа с капиталом от 500 000 рублей
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Доход 150 000 — 500 000 рублей в месяц
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="applications" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Путь от новичка до профи</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Чёткий маршрут из трёх шагов: от первой регистрации на бирже до стабильного ежемесячного дохода
            без опыта в трейдинге.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}
