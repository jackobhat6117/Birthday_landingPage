"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
}

export default function FloatingConfetti() {
  const confettiRef = useRef<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ["#FF5E7D", "#FF9671", "#FFC75F", "#F9F871", "#D65DB1", "#845EC2"]

    // Generate confetti pieces
    confettiRef.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {confettiRef.current.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size * 0.4,
            backgroundColor: piece.color,
            rotate: `${piece.rotation}deg`,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [
              `${piece.x}%`,
              `${piece.x + (Math.random() * 10 - 5)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 10 - 5)}%`,
              `${piece.x}%`,
            ],
            rotate: [`${piece.rotation}deg`, `${piece.rotation + 180}deg`, `${piece.rotation + 360}deg`],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}

