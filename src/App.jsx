import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Loader from './components/Loader'
import Fog from './components/Fog'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Productions = lazy(() => import('./pages/Productions'))
const Talent = lazy(() => import('./pages/Talent'))
const TalentProfile = lazy(() => import('./pages/TalentProfile'))
const Access = lazy(() => import('./pages/Access'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Pages() {
  const location = useLocation()
  return (
    <motion.main
      key={location.pathname}
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/productions" element={<Productions />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/talent/:slug" element={<TalentProfile />} />
          <Route path="/access" element={<Access />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </motion.main>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-obsidian"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Loader />
        <Nav />
        <Pages />
        <Footer />
        {/* Atmosphere sits above content, below the nav. */}
        <Fog />
        <div className="atmos" aria-hidden="true" />
      </BrowserRouter>
    </MotionConfig>
  )
}
