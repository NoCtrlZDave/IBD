import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/modern.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Custom cursor (desktop only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
    })

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
        requestAnimationFrame(animateCursor)
    }
    animateCursor()

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .btn, input, select')) {
            cursor.classList.add('hovered')
        }
    })
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .btn, input, select')) {
            cursor.classList.remove('hovered')
        }
    })
}
