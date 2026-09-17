"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;
    const id = window.setInterval(
      () => { if (loop || active < len - 1) next(); },
      Math.max(700, intervalMs),
    );
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;
  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (_e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 overflow-hidden shadow-xl",
                    "will-change-transform select-none",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                    borderRadius: "16px",
                    border: isActive
                      ? "1px solid rgba(200,146,42,0.6)"
                      : "1px solid rgba(200,146,42,0.15)",
                    boxShadow: isActive
                      ? "0 0 40px rgba(200,146,42,0.35), 0 0 80px rgba(200,146,42,0.15), inset 0 0 20px rgba(200,146,42,0.05)"
                      : "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                  >
                    {renderCard
                      ? renderCard(item, { active: isActive })
                      : <DefaultFanCard item={item} active={isActive} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  style={{
                    width: on ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: on ? "#C8922A" : "rgba(200,146,42,0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
          {activeItem.href && (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
              aria-label="Open link"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full" style={{ background: "#1A0E05" }}>
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
            style={{
              transition: "transform 0.6s ease",
              transform: active ? "scale(1.03)" : "scale(1)",
            }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "#1A0E05", color: "#8A6940", fontSize: "14px" }}
          >
            Sin imagen
          </div>
        )}
      </div>

      {/* Overlay gradiente */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,14,5,0.92) 0%, rgba(26,14,5,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Contenido */}
      <div
        className="relative z-10 flex h-full flex-col justify-end"
        style={{ padding: "1.75rem" }}
      >
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "#C8922A",
            marginBottom: "0.75rem",
            opacity: active ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-cinzel, Cinzel, serif)",
            fontSize: active ? "22px" : "18px",
            color: "#C8922A",
            letterSpacing: "0.12em",
            margin: 0,
            marginBottom: "0.4rem",
            transition: "font-size 0.3s ease",
          }}
        >
          {item.title}
        </p>
        {item.description && (
          <p
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontStyle: "italic",
              fontSize: "15px",
              color: "#C4A882",
              margin: 0,
              opacity: active ? 1 : 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            {item.description}
          </p>
        )}
        {active && item.href && (
          <a
            href={item.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              marginTop: "1rem",
              fontFamily: "var(--font-raleway, Raleway, sans-serif)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#C8922A",
              border: "1px solid rgba(200,146,42,0.5)",
              padding: "8px 20px",
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            RESERVAR MESA
          </a>
        )}
      </div>
    </div>
  );
}
