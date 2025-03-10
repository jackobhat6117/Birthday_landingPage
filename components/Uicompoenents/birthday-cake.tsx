"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BirthdayCake(props: any) {
  const cakeRef = useRef<THREE.Group | null>(null)
  const candlesRef = useRef<(THREE.Mesh | null)[]>([])
  const [candlesLit, setCandlesLit] = useState(true)
  const [message, setMessage] = useState("")

  // Create candle positions
  const candlePositions = [
    new THREE.Vector3(-0.5, 1.2, -0.5),
    new THREE.Vector3(0, 1.2, -0.5),
    new THREE.Vector3(0.5, 1.2, -0.5),
    new THREE.Vector3(-0.5, 1.2, 0),
    new THREE.Vector3(0.5, 1.2, 0),
  ]

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.005
    }

    // Animate candle flames
    if (candlesLit) {
      candlesRef.current.forEach((candle) => {
        if (candle) {
          candle.scale.x = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1
          candle.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1
        }
      })
    }
  })

  const blowOutCandles = () => {
    setCandlesLit(false)
    setMessage("Your wish has been made! 🎉")

    // Reset after 3 seconds
    setTimeout(() => {
      setCandlesLit(true)
      setMessage("")
    }, 3000)
  }

  return (
    <group {...props}>
      <group ref={cakeRef}>
        {/* Cake base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
          <meshStandardMaterial color="#F9C5D5" />
        </mesh>

        {/* Middle layer */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
          <meshStandardMaterial color="#F2A7C3" />
        </mesh>

        {/* Top layer */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.5, 32]} />
          <meshStandardMaterial color="#F06292" />
        </mesh>

        {/* Candles */}
        {candlePositions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Candle stick */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Candle flame */}
            {candlesLit && (
              <mesh
                ref={(el) => {
                  if (el) candlesRef.current[i] = el
                }}
                position={[0, 0.3, 0]}
              >
                <coneGeometry args={[0.05, 0.15, 16]} />
                <meshStandardMaterial color="#FFA726" emissive="#FF9800" emissiveIntensity={2} />
              </mesh>
            )}
          </group>
        ))}

        {/* Text on cake */}
        <Text
          position={[0, 0.26, 1.2]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.2}
          color="#D81B60"
          anchorX="center"
          anchorY="middle"
        >
          Happy Birthday!
        </Text>
      </group>

      {/* Interactive UI */}
      <Html position={[0, -2, 0]} center>
        <div className="flex flex-col items-center space-y-4 w-64 text-center">
          <Button
            onClick={blowOutCandles}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Blow Out Candles
          </Button>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-medium"
            >
              {message}
            </motion.div>
          )}
        </div>
      </Html>
    </group>
  )
}
