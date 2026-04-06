import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей Морозов",
    role: "Новичок → доход 85 000 ₽/мес за 2 месяца",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Пришёл без опыта вообще. За первую неделю разобрался со связками и сделал первые 12 000 рублей. Сейчас второй месяц — стабильно 85 000. Реально работает.",
  },
  {
    name: "Марина Соколова",
    role: "Опытный трейдер, доход 320 000 ₽/мес",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "До этого торговала на споте и терпела убытки. Арбитраж — это другое: нет угадывания, только математика. Уже 4 месяца стабильно выше 300 тысяч в месяц.",
  },
  {
    name: "Дмитрий Харченко",
    role: "Фрилансер, совмещает с основной работой",
    avatar: "/professional-woman-scientist.png",
    content:
      "Занимаюсь 2-3 часа в день параллельно с работой. За первый месяц вышел на 45 000 дополнительно. Платформа дала всё: обучение, сигналы и поддержку.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Реальные результаты участников</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Люди с разным опытом уже зарабатывают с помощью P2P арбитража
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
