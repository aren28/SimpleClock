import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimpleClock from './SimpleClock'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import './assets/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleClock />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
