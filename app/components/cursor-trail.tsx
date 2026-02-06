"use client";

import { useEffect, useRef, useState } from "react";
import { getAccentRgb } from "@/lib/utils";

export function CursorTrail() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [rgb, setRgb] = useState("0, 255, 159");

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    setRgb(getAccentRgb());

    const observer = new MutationObserver(() => {
      setRgb(getAccentRgb());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    function handleMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function animate() {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;

      if (glow) {
        glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[100]"
      style={{
        background: `radial-gradient(circle, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 40%, transparent 70%)`,
        willChange: "transform",
      }}
    />
  );
}
