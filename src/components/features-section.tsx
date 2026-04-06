import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Сигналы в реальном времени",
    description: "Получай точные арбитражные сигналы с указанием биржи, пары и спреда. Успей раньше рынка.",
    icon: "zap",
    badge: "Live",
  },
  {
    title: "Защита капитала",
    description: "Проверенные схемы входа и выхода с минимальными рисками. Торгуй только с подтверждёнными связками.",
    icon: "lock",
    badge: "Безопасно",
  },
  {
    title: "Обучение с нуля",
    description: "Пошаговые инструкции для новичков: от регистрации на бирже до первой прибыли за 7 дней.",
    icon: "globe",
    badge: "Новичкам",
  },
  {
    title: "Умный трекер прибыли",
    description: "Автоматический подсчёт доходности по каждой связке. Знай свою реальную прибыль в любой момент.",
    icon: "brain",
    badge: "Аналитика",
  },
  {
    title: "Закрытое сообщество",
    description: "Опытные трейдеры делятся связками, лайфхаками и стратегиями в закрытом чате каждый день.",
    icon: "link",
    badge: "Сообщество",
  },
  {
    title: "Мультибиржевые связки",
    description: "Работаем с Binance, Bybit, OKX, Garantex и 20+ другими площадками для максимального охвата.",
    icon: "target",
    badge: "20+ бирж",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Всё для стабильного заработка</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Инструменты и знания, которые нужны как новичку, так и опытному трейдеру
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "📊"}
                    {feature.icon === "lock" && "🔒"}
                    {feature.icon === "globe" && "🎓"}
                    {feature.icon === "zap" && "⚡"}
                    {feature.icon === "link" && "💬"}
                    {feature.icon === "target" && "🎯"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
