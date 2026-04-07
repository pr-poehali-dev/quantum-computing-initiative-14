import { useState, useEffect, useRef, useCallback } from "react"
import Icon from "@/components/ui/icon"

const faqs = [
  {
    question: "Что такое P2P арбитраж и как он работает?",
    answer:
      "P2P арбитраж — это заработок на разнице курсов криптовалют между разными биржами или платёжными системами. Покупаешь дешевле на одной площадке, продаёшь дороже на другой. Прибыль — это спред (разница в цене). Никакого угадывания рынка — только математика.",
  },
  {
    question: "Нужен ли опыт в трейдинге или криптовалютах?",
    answer:
      "Нет. Большинство наших участников пришли с нулевым опытом. В платформе есть пошаговое обучение: от регистрации на бирже до первой сделки. Куратор сопровождает на каждом этапе.",
  },
  {
    question: "Сколько денег нужно для старта?",
    answer:
      "Для старта достаточно от 10 000 рублей. Это позволит освоить механику и сделать первые сделки. Для стабильного дохода от 50 000 рублей в месяц рекомендуем капитал от 100 000 рублей.",
  },
  {
    question: "Сколько времени нужно уделять в день?",
    answer:
      "На старте — 2-3 часа в день для обучения и первых сделок. После освоения базовых схем — 1-2 часа. Многие участники совмещают арбитраж с основной работой.",
  },
  {
    question: "Это законно?",
    answer:
      "Да. P2P арбитраж — это легальная деятельность. Вы совершаете обычные операции купли-продажи на биржах. Мы рекомендуем декларировать доход как самозанятый или ИП.",
  },
  {
    question: "Какой доход реально ожидать?",
    answer:
      "Новички с капиталом 100 000 рублей зарабатывают 30 000–80 000 рублей в месяц. Опытные трейдеры с капиталом от 500 000 рублей выходят на 150 000–500 000 рублей. Конкретные цифры зависят от активности и капитала.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  visible,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
  visible: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight)
    }
  }, [answer])

  return (
    <div
      className={`group relative rounded-2xl transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div
        className={`absolute -inset-px rounded-2xl transition-all duration-500 ${
          isOpen
            ? "bg-gradient-to-br from-red-500/25 via-red-500/5 to-transparent"
            : "bg-gradient-to-br from-white/[0.04] via-transparent to-transparent"
        }`}
      />

      <div className="relative glass-card rounded-2xl overflow-hidden">
        <div
          className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${
            isOpen ? "via-red-500/50" : "via-white/[0.06]"
          }`}
        />

        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-7 py-5 text-left"
        >
          <div className="flex items-center gap-4 pr-4">
            <span className="font-space-mono text-xs text-gray-600 flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-orbitron text-sm md:text-base font-semibold transition-colors duration-300 ${
                isOpen ? "text-white" : "text-gray-300"
              }`}
            >
              {question}
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isOpen
                ? "bg-red-500/20 border border-red-500/30"
                : "bg-white/[0.04] border border-white/[0.08]"
            }`}
          >
            <Icon
              name="Plus"
              size={16}
              className={`transition-all duration-300 ${
                isOpen ? "text-red-400 rotate-45" : "text-gray-500 rotate-0"
              }`}
            />
          </div>
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: isOpen ? `${maxHeight}px` : "0px" }}
        >
          <div className="px-7 pb-6 pt-0">
            <div className="pl-8 border-l border-red-500/20 ml-1">
              <p className="font-geist text-sm text-gray-400 leading-relaxed">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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

  return (
    <section ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Частые вопросы
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Отвечаем на самые популярные вопросы о P2P арбитраже и работе с платформой.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
