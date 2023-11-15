import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import StyledComponentsRegistry from '@/lib/registry'
import LenisScroll from '@/templates/LenisScroll'
import Header from '@/components/Header'

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <LenisScroll>
      <html lang='en' className='antialiased'>
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <body>
          <Header />
          <main>
            {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
            <StyledComponentsRegistry>
              <Layout>{children}</Layout>
            </StyledComponentsRegistry>
          </main>
        </body>
      </html>
    </LenisScroll>
  )
}
