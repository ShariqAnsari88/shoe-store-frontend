import { CSSProperties } from 'react'

export const slideRight = (inView: boolean): CSSProperties => ({
  transform: inView ? 'none' : 'translateX(-200px)',
  opacity: inView ? 1 : 0,
  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
})
