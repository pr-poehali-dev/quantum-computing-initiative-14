import { useState } from "react"
import Icon from "@/components/ui/icon"

function FloatingParticles() {
  const particles = [
    { size: "w-1 h-1", top: "top-[10%]", left: "left-[5%]", delay: "0s", duration: "6s" },
    { size: "w-1.5 h-1.5", top: "top-[25%]", left: "left-[15%]", delay: "1s", duration: "8s" },
    { size: "w-1 h-1", top: "top-[60%]", left: "left-[25%]", delay: "2s", duration: "7s" },
    { size: "w-0.5 h-0.5", top: "top-[40%]", left: "left-[45%]", delay: "0.5s", duration: "9s" },
    { size: "w-1 h-1", top: "top-[15%]", left: "left-[55%]", delay: "3s", duration: "6s" },
    { size: "w-1.5 h-1.5", top: "top-[70%]", left: "left-[65%]", delay: "1.5s", duration: "8s" },
    { size: "w-0.5 h-0.5", top: "top-[30%]", left: "left-[75%]", delay: "2.5s", duration: "7s" },
    { size: "w-1 h-1", top: "top-[50%]", left: "left-[85%]", delay: "0.8s", duration: "6s" },
    { size: "w-0.5 h-0.5", top: "top-[80%]", left: "left-[92%]", delay: "3.5s", duration: "9s" },
    { size: "w-1 h-1", top: "top-[5%]", left: "left-[35%]", delay: "4s", duration: "7s" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size} ${p.top} ${p.left} rounded-full bg-red-500/20 animate-float`}
          style={{ animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-px" />

      <FloatingParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 blur-sm animate-pulse" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold text-white">
                P2P<span className="text-red-500">Арбитраж</span>
              </h2>
            </div>
            <p className="font-geist text-gray-400 mb-6 max-w-sm leading-relaxed">
              Платформа для заработка на P2P арбитраже криптовалют. Обучение, сигналы и сообщество для новичков и профессионалов.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://t.me/+7eoNYNT4wKNmMWUy"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300"
              >
                <Icon name="Send" size={18} />
              </a>
              <a
                href="#"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300"
              >
                <Icon name="Mail" size={18} />
              </a>
              <a
                href="#"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300"
              >
                <Icon name="Youtube" size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-orbitron text-white font-semibold mb-4 text-sm tracking-wider uppercase">Платформа</h3>
            <ul className="space-y-3">
              {[
                { href: "#applications", label: "Как начать" },
                { href: "#features", label: "Возможности" },
                { href: "#faq", label: "Вопросы" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-geist text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-orbitron text-white font-semibold mb-4 text-sm tracking-wider uppercase">Компания</h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "О нас" },
                { href: "#", label: "Блог" },
                { href: "#", label: "Контакты" },
                { href: "#", label: "Партнёрам" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="font-geist text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-orbitron text-white font-semibold mb-4 text-sm tracking-wider uppercase">Рассылка</h3>
            <p className="font-geist text-gray-400 text-sm mb-4 leading-relaxed">
              Подпишитесь на обновления и получайте лучшие связки первыми.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Icon
                    name="Mail"
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-geist text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-geist text-sm font-medium rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 flex-shrink-0"
                >
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              {subscribed && (
                <p className="absolute -bottom-6 left-0 font-geist text-xs text-green-400 animate-pulse">
                  Вы подписаны!
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-geist text-gray-500 text-sm">
            &copy; 2026 P2PАрбитраж. Все права защищены.
          </p>

          <p className="font-geist text-gray-500 text-sm order-last md:order-none">
            Сделано с <span className="text-red-500">&#10084;</span> в России
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: "#", label: "Конфиденциальность" },
              { href: "#", label: "Условия использования" },
              { href: "#", label: "Риски и дисклеймер" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="font-geist text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
