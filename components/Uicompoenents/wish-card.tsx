"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface WishCardProps {
  name: string
  message: string
  emoji: string
  delay?: number
}

export default function WishCard({ name, message, emoji, delay = 0 }: WishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-black/30 backdrop-blur-md border-white/10 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{name}</h3>
            <span className="text-2xl">{emoji}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{message}</p>
        </CardContent>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full"></div>
      </Card>
    </motion.div>
  )
}

