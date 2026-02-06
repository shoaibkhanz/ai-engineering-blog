"use client";

import { motion } from "framer-motion";
import { ParticleGrid } from "./particle-grid";

const socials = [
  { key: "github", type: "HttpUrl", href: "https://github.com/shoaibkhanz" },
  { key: "linkedin", type: "HttpUrl", href: "https://linkedin.com/in/shoaibkhanz" },
  { key: "email", type: "EmailStr", href: "mailto:hello@convergeml.com" },
];

function Line({ num, children, delay }: { num: number; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      className="flex"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className="w-8 text-right mr-4 text-text-secondary/40 text-xs select-none shrink-0 leading-7">
        {num}
      </span>
      <div className="leading-7">{children}</div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden">
      <ParticleGrid />
      <div className="scanlines absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-8 w-full">
        {/* Ambient glow — slow organic drift */}
        <motion.div
          className="absolute pointer-events-none w-[300px] h-[200px] top-[-50px] left-[-60px]"
          animate={{
            x: [0, 80, 200, 260, 180, 40, 0],
            y: [0, 30, -10, 60, 100, 50, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.18,
            filter: "blur(45px)",
          }}
        />
        <motion.div
          className="absolute pointer-events-none w-[260px] h-[180px] bottom-[-40px] right-[-50px]"
          animate={{
            x: [0, -60, -180, -240, -140, -30, 0],
            y: [0, -25, 15, -50, -90, -35, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.14,
            filter: "blur(40px)",
          }}
        />

        {/* Code editor window */}
        <motion.div
          className="relative bg-surface/80 backdrop-blur-sm border border-accent/15 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: "0 0 40px rgba(var(--glow-rgb), 0.18), 0 0 100px rgba(var(--glow-rgb), 0.1), 0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg/80">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
              <span className="w-2.5 h-2.5 rounded-full bg-green" />
            </div>
            <span className="text-[11px] text-text-secondary ml-2">shoaib_khan.py</span>
          </div>

          {/* Code content */}
          <div className="px-4 py-4 text-sm md:text-base font-mono">
            <Line num={1} delay={0.1}>
              <span className="text-cyan">class</span>{" "}
              <span className="text-text-heading font-bold text-lg md:text-xl">ShoaibKhan</span>
              <span className="text-text-secondary">(</span>
              <span className="text-accent">BaseModel</span>
              <span className="text-text-secondary">):</span>
            </Line>

            <Line num={2} delay={0.2}>
              <span className="text-accent/50 pl-6">&quot;&quot;&quot;</span>
              <span className="text-text-secondary">Machine Learning</span>
              <span className="text-text-secondary/40 mx-2">·</span>
              <span className="text-text-secondary">Healthcare AI</span>
              <span className="text-text-secondary/40 mx-2">·</span>
              <span className="text-text-secondary">Distributed Systems</span>
              <span className="text-accent/50">&quot;&quot;&quot;</span>
            </Line>

            <Line num={3} delay={0.25}>
              <span className="pl-6 text-text">role</span>
              <span className="text-text-secondary">: </span>
              <span className="text-cyan">str</span>
              <span className="text-text-secondary"> = </span>
              <span className="text-accent/80">&quot;ML Engineer&quot;</span>
            </Line>

            {socials.map((s, i) => (
              <Line key={s.key} num={4 + i} delay={0.35 + i * 0.1}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group pl-6 flex items-center -mx-2 px-2 rounded hover:bg-accent/5 transition-colors"
                >
                  <span className="text-text">{s.key}</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-cyan group-hover:text-accent transition-colors underline decoration-transparent group-hover:decoration-accent/40 underline-offset-2">{s.type}</span>
                  <span className="text-text-secondary/0 group-hover:text-text-secondary/50 transition-colors ml-auto text-xs">
                    # ↗
                  </span>
                </a>
              </Line>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
