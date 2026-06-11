"use client";

import { useEffect, useRef } from "react";
import { getAccentRgb } from "@/lib/utils";

interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

const SPACING = 56;
const WARP_RADIUS = 170;
const WARP_STRENGTH = 16;
const EASE = 0.12;

/**
 * Full-viewport grid background that bends away from the cursor.
 * Replaces the old static body::after CSS grid. Pauses its rAF loop
 * when the grid has settled, and renders a single static frame under
 * prefers-reduced-motion.
 */
export function WarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    let lineRgb = isLight() ? "72, 62, 38" : "255, 255, 255";
    let accentRgb = getAccentRgb();
    let baseAlpha = isLight() ? 0.07 : 0.045;

    const observer = new MutationObserver(() => {
      lineRgb = isLight() ? "72, 62, 38" : "255, 255, 255";
      accentRgb = getAccentRgb();
      baseAlpha = isLight() ? 0.07 : 0.045;
      wake();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let points: GridPoint[] = [];
    let cols = 0;
    let rows = 0;
    // Cursor starts far offscreen so the grid renders flat
    let mouseX = -10000;
    let mouseY = -10000;
    let smoothX = -10000;
    let smoothY = -10000;
    let rafId = 0;
    let running = false;

    function initPoints() {
      if (!canvas) return;
      cols = Math.ceil(canvas.offsetWidth / SPACING) + 2;
      rows = Math.ceil(canvas.offsetHeight / SPACING) + 2;
      points = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * SPACING;
          const y = j * SPACING;
          points.push({ baseX: x, baseY: y, x, y });
        }
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints();
      draw();
    }

    /** Move points toward their warped targets; returns total motion. */
    function update(): number {
      let motion = 0;
      for (const p of points) {
        const dx = p.baseX - smoothX;
        const dy = p.baseY - smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.baseX;
        let targetY = p.baseY;
        if (dist < WARP_RADIUS && dist > 0.001) {
          const falloff = 1 - dist / WARP_RADIUS;
          const push = WARP_STRENGTH * falloff * falloff;
          targetX = p.baseX + (dx / dist) * push;
          targetY = p.baseY + (dy / dist) * push;
        }

        const stepX = (targetX - p.x) * EASE;
        const stepY = (targetY - p.y) * EASE;
        p.x += stepX;
        p.y += stepY;
        motion += Math.abs(stepX) + Math.abs(stepY);
      }
      return motion;
    }

    function segmentAlpha(a: GridPoint, b: GridPoint): number {
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const dx = midX - smoothX;
      const dy = midY - smoothY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= WARP_RADIUS) return 0;
      const falloff = 1 - dist / WARP_RADIUS;
      return falloff * falloff;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.lineWidth = 1;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const p = points[j * cols + i];
          // Right neighbour
          if (i < cols - 1) {
            const q = points[j * cols + i + 1];
            strokeSegment(p, q);
          }
          // Down neighbour
          if (j < rows - 1) {
            const q = points[(j + 1) * cols + i];
            strokeSegment(p, q);
          }
        }
      }
    }

    function strokeSegment(a: GridPoint, b: GridPoint) {
      if (!ctx) return;
      const glow = segmentAlpha(a, b);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      if (glow > 0.01) {
        ctx.strokeStyle = `rgba(${accentRgb}, ${baseAlpha + glow * 0.22})`;
      } else {
        ctx.strokeStyle = `rgba(${lineRgb}, ${baseAlpha})`;
      }
      ctx.stroke();
    }

    function tick() {
      smoothX += (mouseX - smoothX) * 0.18;
      smoothY += (mouseY - smoothY) * 0.18;
      const motion = update();
      draw();

      const cursorSettled =
        Math.abs(mouseX - smoothX) + Math.abs(mouseY - smoothY) < 0.5;
      if (motion < 0.5 && cursorSettled) {
        running = false;
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    function wake() {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      wake();
    }

    function handleMouseLeave() {
      mouseX = -10000;
      mouseY = -10000;
      wake();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      resize();
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
        observer.disconnect();
      };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
}
