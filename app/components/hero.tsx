"use client";

import { motion } from "framer-motion";
import { ParticleGrid } from "./particle-grid";

const socials = [
  { key: "github", type: "HttpUrl", href: "https://github.com/shoaibkhanz", icon: "G" },
  { key: "linkedin", type: "HttpUrl", href: "https://linkedin.com/in/shoaibkhanz", icon: "L" },
  { key: "email", type: "EmailStr", href: "mailto:shoaibkhanz@hotmail.com", icon: "@" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ParticleGrid />
      <div className="scanlines absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-12 w-full">
        {/* Ambient glow — slow organic drift */}
        <motion.div
          className="absolute pointer-events-none w-[300px] h-[200px] top-[-50px] left-[-60px]"
          animate={{
            x: [0, 80, 200, 260, 180, 40, 0],
            y: [0, 30, -10, 60, 100, 50, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.14,
            filter: "blur(40px)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 gap-8">
          {/* Left: headline + tagline + social links */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-4 leading-tight">
              Shoaib Khan
            </h1>

            {/* Tagline */}
            <p className="text-text-secondary text-sm md:text-base mb-6 leading-relaxed max-w-md">
              ML engineer building AI systems, agents, and the production infrastructure behind them.
            </p>

            {/* Social links as terminal commands */}
            <div className="flex flex-wrap gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 text-xs border border-border px-3 py-1.5 rounded hover:border-accent/40 hover:bg-accent/5 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <span className="text-accent/60 group-hover:text-accent transition-colors">{s.icon}</span>
                  <span className="text-text-secondary group-hover:text-text transition-colors">{s.key}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: compact Pydantic model as accent piece */}
          <motion.div
            className="lg:w-[400px] xl:w-[440px] shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="bg-surface/80 backdrop-blur-sm border border-accent/15 rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 0 30px rgba(var(--glow-rgb), 0.12), 0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg/80">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red" />
                  <span className="w-2 h-2 rounded-full bg-yellow" />
                  <span className="w-2 h-2 rounded-full bg-green" />
                </div>
                <span className="text-[10px] text-text-secondary ml-1">model.py</span>
              </div>

              {/* Code */}
              <div className="px-3 py-3 text-xs leading-6">
                <div>
                  <span className="text-cyan">class</span>{" "}
                  <span className="text-text-heading font-bold">ShoaibKhan</span>
                  <span className="text-text-secondary">(</span>
                  <span className="text-accent">BaseModel</span>
                  <span className="text-text-secondary">):</span>
                </div>
                <div className="pl-4">
                  <span className="text-text">role</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-cyan">str</span>
                  <span className="text-text-secondary"> = </span>
                  <span className="text-accent/80">&quot;ML Engineer&quot;</span>
                </div>
                <div className="pl-4">
                  <span className="text-text">focus</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-cyan">list</span>
                  <span className="text-text-secondary"> = [</span>
                </div>
                <div className="pl-8">
                  <span className="text-accent/70">&quot;AI Engineering&quot;</span>
                  <span className="text-text-secondary">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-accent/70">&quot;Agents &amp; LLMs&quot;</span>
                  <span className="text-text-secondary">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-accent/70">&quot;Production Infrastructure&quot;</span>
                  <span className="text-text-secondary">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-secondary">]</span>
                </div>
                <div className="pl-4">
                  <span className="text-text">status</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-cyan">str</span>
                  <span className="text-text-secondary"> = </span>
                  <span className="text-green">&quot;building&quot;</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
