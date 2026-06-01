"use client";
import React from "react";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0804',
        width: '100%',
      }}
      className={className}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        flex: 1,
        transform: 'scaleY(1.25)',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        zIndex: 0,
      }}>
        {/* Lado izquierdo dorado */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '40rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 'auto',
            right: '50%',
            height: '14rem',
            overflow: 'visible',
            backgroundImage: 'conic-gradient(from 70deg at center top, #C9A84C, transparent, transparent)',
            color: 'white',
          }}
        >
          <div style={{ position: 'absolute', width: '100%', left: 0, background: '#0A0804', height: '10rem', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to top, white, transparent)' }} />
          <div style={{ position: 'absolute', width: '10rem', height: '100%', left: 0, background: '#0A0804', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to right, white, transparent)' }} />
        </motion.div>

        {/* Lado derecho dorado */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '40rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 'auto',
            left: '50%',
            height: '14rem',
            backgroundImage: 'conic-gradient(from 290deg at center top, transparent, transparent, #C9A84C)',
            color: 'white',
          }}
        >
          <div style={{ position: 'absolute', width: '10rem', height: '100%', right: 0, background: '#0A0804', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to left, white, transparent)' }} />
          <div style={{ position: 'absolute', width: '100%', right: 0, background: '#0A0804', height: '10rem', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to top, white, transparent)' }} />
        </motion.div>

        <div style={{ position: 'absolute', top: '50%', height: '12rem', width: '100%', transform: 'translateY(3rem) scaleX(1.5)', background: '#0A0804', filter: 'blur(24px)' }} />
        <div style={{ position: 'absolute', top: '50%', zIndex: 50, height: '12rem', width: '100%', background: 'transparent', opacity: 0.1, backdropFilter: 'blur(8px)' }} />

        {/* Glow central dorado */}
        <div style={{ position: 'absolute', inset: 'auto', zIndex: 50, height: '9rem', width: '40rem', transform: 'translateY(-50%)', borderRadius: '9999px', background: 'rgba(201,168,76,.25)', filter: 'blur(60px)' }} />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '20rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 'auto', zIndex: 30, height: '9rem', transform: 'translateY(-6rem)', borderRadius: '9999px', background: 'rgba(201,168,76,.35)', filter: 'blur(24px)' }}
        />

        {/* Línea dorada */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '40rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 'auto', zIndex: 50, height: '2px', transform: 'translateY(-7rem)', background: 'rgba(201,168,76,.6)' }}
        />

        <div style={{ position: 'absolute', inset: 'auto', zIndex: 40, height: '11rem', width: '100%', transform: 'translateY(-12.5rem)', background: '#0A0804' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 50, display: 'flex', transform: 'translateY(-10rem)', flexDirection: 'column', alignItems: 'center', padding: '0 1.25rem' }}>
        {children}
      </div>
    </div>
  );
};