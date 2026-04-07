import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-black/60 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 blur-sm animate-pulse" />
            </div>
            <h1 className="font-orbitron text-xl font-bold text-white">
              P2P<span className="text-red-500">Арбитраж</span>
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { href: "#applications", label: "Как начать" },
                { href: "#features", label: "Возможности" },
                { href: "#faq", label: "Вопросы" },
                { href: "#register", label: "Оставить заявку" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative font-geist text-gray-300 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <a href="https://t.me/+7eoNYNT4wKNmMWUy" target="_blank" rel="noopener noreferrer">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0 gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300">
                <Icon name="Send" size={16} />
                Начать бесплатно
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative text-white hover:text-red-400 transition-colors duration-300 p-2"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 origin-center ${
                    isOpen ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 origin-center ${
                    isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-red-500/10">
            {[
              { href: "#applications", label: "Как начать" },
              { href: "#features", label: "Возможности" },
              { href: "#faq", label: "Вопросы" },
              { href: "#register", label: "Оставить заявку" },
            ].map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 font-geist text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 hover:pl-5"
                style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-3 pt-2">
              <a href="https://t.me/+7eoNYNT4wKNmMWUy" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-geist border-0 gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Icon name="Send" size={16} />
                  Начать бесплатно
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
