import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import func2url from "../../backend/func2url.json"

export function LeadFormSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

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
    <section id="register" className="py-24 px-6 bg-black">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">Оставить заявку</h2>
          <p className="text-gray-300 text-lg">
            Заполни форму — куратор свяжется с тобой и поможет сделать первый шаг
          </p>
        </div>

        {success ? (
          <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
            <p className="text-gray-300">Куратор свяжется с тобой в ближайшее время.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-red-500/20 rounded-2xl p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">Имя</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-medium">Телефон</Label>
              <Input
                id="phone"
                placeholder="+7 900 000 00 00"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ivan@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6 gap-2 font-semibold"
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

            <p className="text-zinc-500 text-xs text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
