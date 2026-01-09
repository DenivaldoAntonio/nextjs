'use client'

import { useEffect, useState } from "react"

export default function Relogio() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)

    const id = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  if (!mounted) {
    return null
  }

  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const ss = String(time.getSeconds()).padStart(2, '0')

  return (
    <div>
      {hh}:{mm}:{ss}
    </div>
  )
}