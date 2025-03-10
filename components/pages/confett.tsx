"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Confetti() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      rotation: number
      shape: string
    }>
  >([])

  useEffect(() => {
    // Create confetti particles
    const colors = [
      "#FF5E7D", // pink
      "#9C27B0", // purple
      "#3F51B5", // indigo
      "#FF9800", // orange
      "#FFEB3B", // yellow
      "#E91E63", // bright pink
      "#673AB7", // deep purple
      "#2196F3", // blue
    ]

    const shapes = ["square", "circle", "triangle"]

    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === "circle" ? "50%" : particle.shape === "triangle" ? "0%" : "0%",
            clipPath: particle.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            rotate: `${particle.rotation}deg`,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 20 - 10)}%`,
              `${particle.x + (Math.random() * 40 - 20)}%`,
            ],
            rotate: [`${particle.rotation}deg`, `${particle.rotation + 360 * 3}deg`],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            ease: "easeInOut",
            times: [0, 0.8, 1],
          }}
        />
      ))}
    </div>
  )
}

