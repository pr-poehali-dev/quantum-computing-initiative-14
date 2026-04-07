import { useEffect, useRef, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const testimonials = [
  {
    name: "Алексей Морозов",
    role: "Новичок \u2192 доход 85 000 \u20BD/мес за 2 месяца",
    initials: "АМ",
    color: "from-red-500 to-red-700",
    stars: 5,
    income: "+85 000 \u20BD/мес",
    content:
      "Пришёл без опыта вообще. За первую неделю разобрался со связками и сделал первые 12 000 рублей. Сейчас второй месяц \u2014 стабильно 85 000. Реально работает.",
  },
  {
    name: "Марина Соколова",
    role: "Опытный трейдер, доход 320 000 \u20BD/мес",
    initials: "МС",
    color: "from-orange-500 to-red-500",
    stars: 5,
    income: "+320 000 \u20BD/мес",
    content:
      "До этого торговала на споте и терпела убытки. Арбитраж \u2014 это другое: нет угадывания, только математика. Уже 4 месяца стабильно выше 300 тысяч в месяц.",
  },
  {
    name: "Дмитрий Харченко",
    role: "Фрилансер, совмещает с основной работой",
    initials: "ДХ",
    color: "from-yellow-500 to-orange-500",
    stars: 5,
    income: "+45 000 \u20BD/мес",
    content:
      "Занимаюсь 2-3 часа в день параллельно с работой. За первый месяц вышел на 45 000 дополнительно. Платформа дала всё: обучение, сигналы и поддержку.",
  },
]

function TestimonialCard({
  name,
  role,
  initials,
  color,
  stars,
  income,
  content,
  index,
  visible,
}: {
  name: string
  role: string
  initials: string
  color: string
  stars: number
  income: string
  content: string
  index: number
  visible: boolean
}) {
  return (
    <div
      className={`group relative rounded-2xl transition-all duration-700 hover:scale-[1.02] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.04] opacity-100 group-hover:from-red-500/30 group-hover:via-red-500/5 group-hover:to-red-500/20 transition-all duration-500" />

      <div className="relative glass-card rounded-2xl p-7 h-full flex flex-col">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/50 transition-all duration-500" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span className="font-space-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {income}
          </span>
        </div>

        <div className="relative flex-1 mb-6">
          <span className="absolute -top-2 -left-1 text-5xl font-serif text-red-500/15 leading-none select-none pointer-events-none">
            &ldquo;
          </span>
          <p className="font-geist text-gray-300 leading-relaxed text-[15px] relative z-10 pt-4">
            {content}
          </p>
          <span className="absolute -bottom-4 right-0 text-5xl font-serif text-red-500/15 leading-none select-none pointer-events-none">
            &rdquo;
          </span>
        </div>

        <div className="flex items-center gap-4 pt-5 border-t border-white/[0.06]">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <span className="text-white font-bold text-sm font-geist">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-orbitron font-bold text-white text-sm truncate">{name}</p>
            <p className="font-geist text-xs text-gray-500 mt-0.5 truncate">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) setVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <section ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Отзывы
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Реальные результаты участников
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Люди с разным опытом уже зарабатывают с помощью P2P арбитража
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
