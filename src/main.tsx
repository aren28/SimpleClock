import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimpleClock from './SimpleClock'
import './assets/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleClock />
  </StrictMode>,
)
