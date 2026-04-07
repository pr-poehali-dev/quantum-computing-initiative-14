import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" }
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" }

extend(THREE as unknown as Record<string, unknown>)

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;

        // Depth-based displacement
        float depth = texture2D(uDepthMap, uv).r;
        vec2 displacement = depth * uPointer * 0.01;
        vec2 distortedUv = uv + displacement;

        // Base texture
        vec4 baseColor = texture2D(uTexture, distortedUv);

        // Create scanning effect
        float aspect = ${WIDTH}.0 / ${HEIGHT}.0;
        vec2 tUv = vec2(uv.x * aspect, uv.y);
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;

        float brightness = noise(tUv * tiling * 0.5);
        float dist = length(tiledUv);
        float dot = smoothstep(0.5, 0.49, dist) * brightness;

        // Flow effect based on progress
        float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));

        // Red scanning overlay
        vec3 mask = vec3(dot * flow * 10.0, 0.0, 0.0);

        // Combine effects
        vec3 final = baseColor.rgb + mask;

        gl_FragColor = vec4(final, 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [rawMap, depthMap])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
      material.uniforms.uPointer.value = pointer
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const scaleFactor = 0.3
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const titleWords = "P2P \u0410\u0440\u0431\u0438\u0442\u0440\u0430\u0436".split(" ")
  const subtitle = "\u0417\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0439 \u043d\u0430 \u0440\u0430\u0437\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u043e\u0432. \u0421 \u043d\u0443\u043b\u044f \u0434\u043e \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0434\u043e\u0445\u043e\u0434\u0430."
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07))
    setSubtitleDelay(Math.random() * 0.1)
  }, [titleWords.length])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleWords, titleWords.length])

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="h-screen uppercase items-center w-full absolute z-[60] px-10 flex justify-center flex-col" style={{ pointerEvents: 'none' }}>
        <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-orbitron">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={`gradient-text ${index < visibleWords ? "fade-in" : ""}`}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm md:text-xl xl:text-2xl 2xl:text-3xl mt-3 overflow-hidden text-white/90 font-bold max-w-4xl mx-auto text-center px-4 tracking-wide">
          <div
            className={`font-geist ${subtitleVisible ? "fade-in-subtitle" : ""}`}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          className={`mt-8 flex flex-col sm:flex-row gap-4 normal-case ${subtitleVisible ? "fade-in-subtitle" : ""}`}
          style={{
            pointerEvents: 'auto',
            animationDelay: `${titleWords.length * 0.13 + 0.5 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          <a href="#register">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white font-geist text-lg px-8 py-4 gap-2 font-semibold border-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all duration-300">
              <Icon name="Send" size={20} />
              Оставить заявку
            </Button>
          </a>
          <a href="#applications">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-geist text-lg px-8 py-4 bg-white/5 backdrop-blur-sm transition-all duration-300">
              Как это работает
            </Button>
          </a>
        </div>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 sm:gap-3 normal-case ${subtitleVisible ? "fade-in-subtitle" : ""}`}
          style={{
            animationDelay: `${titleWords.length * 0.13 + 0.8 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          {[
            { value: "2 400+", label: "\u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432" },
            { value: "3\u20138%", label: "\u0441 \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u043e\u0431\u043e\u0440\u043e\u0442\u0430" },
            { value: "\u043e\u0442 7 \u0434\u043d\u0435\u0439", label: "\u0434\u043e \u043f\u0435\u0440\u0432\u043e\u0439 \u043f\u0440\u0438\u0431\u044b\u043b\u0438" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center px-5 py-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] hover:border-red-500/30 transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="text-xl md:text-2xl font-extrabold gradient-text-red font-orbitron">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-0.5 font-geist font-normal">{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 normal-case ${subtitleVisible ? "fade-in-subtitle" : ""}`}
          style={{
            pointerEvents: 'auto',
            animationDelay: `${titleWords.length * 0.13 + 1.1 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          <a href="#features" className="flex flex-col items-center gap-1 group">
            <span className="font-geist text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              Узнать больше
            </span>
            <div className="animate-bounce">
              <Icon name="ChevronDown" size={20} className="text-gray-500 group-hover:text-red-400 transition-colors duration-300" />
            </div>
          </a>
        </div>
      </div>

      <Canvas
        flat
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#000000" }}
      >
        <Scene />
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 z-[70] bg-black/80 backdrop-blur-sm border-t border-red-500/20 py-3 overflow-hidden">
        <div className="flex gap-10 animate-[ticker_20s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, repeat) => (
            ["Binance", "Bybit", "OKX", "Garantex", "Huobi", "KuCoin", "Gate.io", "MEXC", "Kraken", "Bitfinex"].map((exchange, i) => (
              <span key={`${repeat}-${i}`} className="inline-flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                {exchange}
              </span>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero3DWebGL
