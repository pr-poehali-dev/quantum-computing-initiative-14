import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей Морозов",
    role: "Новичок → доход 85 000 ₽/мес за 2 месяца",
    initials: "АМ",
    color: "bg-red-500",
    stars: 5,
    income: "+85 000 ₽/мес",
    content:
      "Пришёл без опыта вообще. За первую неделю разобрался со связками и сделал первые 12 000 рублей. Сейчас второй месяц — стабильно 85 000. Реально работает.",
  },
  {
    name: "Марина Соколова",
    role: "Опытный трейдер, доход 320 000 ₽/мес",
    initials: "МС",
    color: "bg-orange-500",
    stars: 5,
    income: "+320 000 ₽/мес",
    content:
      "До этого торговала на споте и терпела убытки. Арбитраж — это другое: нет угадывания, только математика. Уже 4 месяца стабильно выше 300 тысяч в месяц.",
  },
  {
    name: "Дмитрий Харченко",
    role: "Фрилансер, совмещает с основной работой",
    initials: "ДХ",
    color: "bg-yellow-600",
    stars: 5,
    income: "+45 000 ₽/мес",
    content:
      "Занимаюсь 2-3 часа в день параллельно с работой. За первый месяц вышел на 45 000 дополнительно. Платформа дала всё: обучение, сигналы и поддержку.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3 font-orbitron">Отзывы</p>
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Реальные результаты участников</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Люди с разным опытом уже зарабатывают с помощью P2P арбитража
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up relative overflow-hidden" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 text-xs font-bold text-red-400 font-orbitron">
                {testimonial.income}
              </div>
              <CardContent className="p-6 pt-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-card-foreground mb-6 leading-relaxed italic text-sm">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={`${testimonial.color} text-white font-bold text-sm`}>
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}