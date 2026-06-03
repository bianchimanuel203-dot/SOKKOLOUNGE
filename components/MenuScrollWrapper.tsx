'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface MenuScrollWrapperProps {
  children: React.ReactNode[]  // exactamente 2 hijos: [MenuSection, CocteleSection]
}

export default function MenuScrollWrapper({ children }: MenuScrollWrapperProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!section1Ref.current || !section2Ref.current) return

    // Sin pin:true — sticky nativo de CSS, sin bugs de navbar
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.6,
      },
    })

    // Primera sección: encoge con rotación sutil
    tl.to(section1Ref.current, {
      scale: 0.92,
      rotation: 1.5,
      transformOrigin: 'center center',
      borderRadius: '16px',
      opacity: 0.7,
      duration: 1,
      ease: 'none',
    }, 0)

    // Segunda sección: sube desde abajo
    tl.fromTo(section2Ref.current,
      { y: '8%', opacity: 0.8 },
      { y: '0%', opacity: 1, duration: 1, ease: 'none' },
      0
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {/* Sección 1 — MenuSection */}
      <div
        ref={section1Ref}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      >
        {children[0]}
      </div>

      {/* Sección 2 — CocteleSection */}
      <div
        ref={section2Ref}
        style={{
          position: 'relative',
          zIndex: 2,
          willChange: 'transform',
        }}
      >
        {children[1]}
      </div>
    </div>
  )
}
