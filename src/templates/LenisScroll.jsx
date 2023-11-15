'use client'

import React, { useEffect } from 'react'
import Router from 'next/router'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import Tempus from '@studio-freight/tempus'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  // reset scroll position
  window.scrollTo(0, 0)
  window.history.scrollRestoration = 'manual'

  gsap.defaults({ ease: 'none' })
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.clearScrollMemory('manual')

  // merge rafs
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  Tempus?.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

export default function LenisScroll({ children }) {
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    ScrollTrigger.refresh()

    const onHashChangeStart = (url) => {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
