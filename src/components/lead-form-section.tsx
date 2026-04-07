import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import func2url from "../../backend/func2url.json"

const trustIndicators = [
  { icon: "Users", text: "Более 2 400 участников" },
  { icon: "Clock", text: "Ответим за 15 минут" },
  { icon: "ShieldCheck", text: "Без спама" },
]

const benefits = [
  "Бесплатное обучение с куратором",
  "Доступ к закрытым связкам",
  "Сигналы в реальном времени",
  "Поддержка 24/7 в чате",
]

const formSteps = [
  { field: "name" as const, label: "Имя", placeholder: "Иван Иванов", type: "text", icon: "User" },
  { field: "phone" as const, label: "Телефон", placeholder: "+7 900 000 00 00", type: "tel", icon: "Phone" },
  { field: "email" as const, label: "Telegram или Email", placeholder: "@username или ivan@example.com", type: "text", icon: "AtSign" },
]

function ConfettiPiece({ index }: { index: number }) {
  const colors = ["bg-red-500", "bg-yellow-400", "bg-emerald-400", "bg-blue-400", "bg-pink-400", "bg-orange-400"]
  const color = colors[index % colors.length]
  const left = `${10 + (index * 17) % 80}%`
  const delay = `${index * 0.15}s`
  const size = index % 3 === 0 ? "w-2 h-2" : index % 3 === 1 ? "w-1.5 h-3" : "w-3 h-1.5"
  const rotation = index % 2 === 0 ? "rotate-45" : "-rotate-12"

  return (
    <div
      className={`absolute ${size} ${color} ${rotation} rounded-sm opacity-0`}
      style={{
        left,
        top: "-10px",
        animation: `confettiFall 1.5s ease-out ${delay} forwards`,
      }}
    />
  )
}

export function LeadFormSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
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

  const filledCount = [form.name, form.phone, form.email].filter((v) => v.trim().length > 0).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(func2url["send-lead"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
        setForm({ name: "", phone: "", email: "" })
      } else {
        setError(data.error || "Ошибка отправки. Попробуйте снова.")
      }
    } catch {
      setError("Ошибка соединения. Попробуйте снова.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="register" ref={ref} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(300px) rotate(720deg); }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Начни сейчас
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Оставить заявку
          </h2>
          <p className="font-geist text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Заполни форму — куратор свяжется с тобой и поможет сделать первый шаг
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {success ? (
              <div className="relative glass-card rounded-2xl p-10 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <ConfettiPiece key={i} index={i} />
                  ))}
                </div>

                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                    <Icon name="Check" size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-orbitron text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
                  <p className="font-geist text-gray-400">Куратор свяжется с тобой в ближайшее время.</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10 pointer-events-none" />

                <div className="relative glass-card rounded-2xl p-8 md:p-10">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8">
                    <Icon name="Sparkles" size={14} className="text-red-400" />
                    <span className="font-geist text-xs font-medium text-red-300">Бесплатная консультация</span>
                  </div>

                  <div className="flex items-center gap-2 mb-8">
                    {[0, 1, 2].map((step) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-geist transition-all duration-500 ${
                            filledCount > step
                              ? "bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                              : "bg-white/5 border border-white/10 text-gray-500"
                          }`}
                        >
                          {filledCount > step ? (
                            <Icon name="Check" size={14} />
                          ) : (
                            step + 1
                          )}
                        </div>
                        {step < 2 && (
                          <div className="flex-1 h-px relative">
                            <div className="absolute inset-0 bg-white/5" />
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
                              style={{ width: filledCount > step ? "100%" : "0%" }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {formSteps.map((step, i) => (
                      <div key={step.field}>
                        <label htmlFor={step.field} className="font-geist text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-space-mono">{String(i + 1).padStart(2, "0")}</span>
                          {step.label}
                        </label>
                        <div className="relative">
                          <Icon
                            name={step.icon}
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                          />
                          <input
                            id={step.field}
                            type={step.type}
                            placeholder={step.placeholder}
                            value={form[step.field]}
                            onChange={(e) => setForm({ ...form, [step.field]: e.target.value })}
                            required
                            className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl font-geist text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(239,68,68,0.1)] focus:bg-white/[0.05] transition-all duration-300"
                          />
                          {form[step.field].trim().length > 0 && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <Icon name="CheckCircle2" size={16} className="text-emerald-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {error && (
                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                        <Icon name="AlertCircle" size={16} className="text-red-400 flex-shrink-0" />
                        <p className="font-geist text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-geist text-base py-6 gap-2.5 font-semibold border-0 shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Icon name="Loader2" size={20} className="animate-spin" />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={20} />
                          Отправить заявку
                        </>
                      )}
                    </Button>

                    <p className="font-geist text-gray-600 text-xs text-center pt-1">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="glass-card rounded-2xl p-7">
              <h3 className="font-orbitron text-white font-bold text-sm mb-5 tracking-wide">Что вы получите</h3>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: visible ? `${400 + i * 100}ms` : "0ms" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-emerald-400" />
                    </div>
                    <span className="font-geist text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {trustIndicators.map((indicator, i) => (
                <div
                  key={i}
                  className={`glass-card rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-500 hover:scale-[1.02] ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: visible ? `${600 + i * 100}ms` : "0ms" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={indicator.icon} size={18} className="text-red-400" />
                  </div>
                  <span className="font-geist text-sm font-medium text-gray-300">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
