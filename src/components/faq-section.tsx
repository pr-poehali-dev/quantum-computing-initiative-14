import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
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

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Отвечаем на самые популярные вопросы о P2P арбитраже и работе с платформой.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
