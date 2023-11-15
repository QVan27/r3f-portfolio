'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { Maitree } from 'next/font/google'
import Logo from '@/assets/images/logo.svg'
import styled from 'styled-components'

const maitree = Maitree({
  weight: ['500'],
  subsets: ['latin'],
})

const nextImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Container = styled.header`
  position: absolute;
  z-index: var(--z-header);
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  nav {
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      li {
        overflow: hidden;

        a {
          position: relative;
          font-size: 0.875rem;
          line-height: 1rem;

          span {
            &.show {
              color: var(--paragraph);
            }

            &.hide {
              display: inline-flex;
              position: absolute;
              inset: 0;
              color: var(--paragraph);
            }

            &.word {
              display: inline-flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
`

export default function Header() {
  const nav = useRef(null)
  const logoRef = useRef(null)
  const charsRefs = useRef([])
  const charsHideRefs = useRef([])

  useEffect(() => {
    if (nav && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()

        const links = nav.current.querySelectorAll('a')

        links.forEach((link) => {
          const chars = link.querySelectorAll('.show .char')
          const charsHide = link.querySelectorAll('.hide .char')

          charsRefs.current.push(chars)
          charsHideRefs.current.push(charsHide)

          gsap.set(charsHide, { yPercent: 100, opacity: 0 })

          link.addEventListener('mouseenter', () => {
            gsap.to(chars, {
              duration: 1,
              yPercent: -100,
              color: 'var(--main)',
              opacity: 0,
              stagger: 0.05,
              ease: 'power4.out',
            })

            gsap.to(charsHide, {
              duration: 1,
              yPercent: 0,
              opacity: 1,
              stagger: 0.05,
              color: 'var(--main)',
              ease: 'power4.out',
            })
          })

          link.addEventListener('mouseleave', () => {
            gsap.to(chars, {
              duration: 1,
              yPercent: 0,
              color: 'var(--paragraph)',
              opacity: 1,
              stagger: 0.05,
              ease: 'power4.out',
            })

            gsap.to(charsHide, {
              duration: 1,
              yPercent: 100,
              opacity: 0,
              color: 'var(--paragraph)',
              stagger: 0.05,
              ease: 'power4.out',
            })
          })
        })
      })
    }

    gsap.set([nav.current, logoRef.current], { yPercent: -100, opacity: 0 })

    gsap.to([nav.current, logoRef.current], {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      delay: 5,
      ease: 'sine.out',
    })
  }, [])

  return (
    <Container>
      <div className='grid grid-cols-12 xl:grid-cols-24 justify-between items-center py-2 gap-x-2.5'>
        <Image
          ref={logoRef}
          priority={true}
          loader={nextImageLoader}
          alt="Art'vannah Logo"
          src={Logo}
          width={210}
          height={48}
          className='flareBigger col-start-2 col-end-8 xl:col-start-3 xl:col-end-7'
        />
        <nav ref={nav} className={`${maitree.className} col-end-12 col-span-3 text-right xl:col-end-23 xl:col-span-2`}>
          <ul>
            {['About', 'Skills', 'Contact'].map((label) => (
              <li key={label}>
                <Link aria-label={label} href={`#${label.toLowerCase()}`}>
                  <span className='show' data-splitting='chars'>
                    {label}
                  </span>
                  <span className='hide' data-splitting='chars'>
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  )
}
