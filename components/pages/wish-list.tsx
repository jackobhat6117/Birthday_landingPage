"use client"

import { motion } from "framer-motion"
import { Heart, Star, Gift, Cake, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Sample wishes - replace with your actual wishes
const wishes = [
  {
    icon: Heart,
    title: "My Love",
    content:
      "I wish you all the love in the world. You deserve nothing but happiness and joy on your special day and every day after.",
  },
  {
    icon: Star,
    title: "Your Dreams",
    content:
      "May all your dreams and wishes come true. I believe in you and will always be here to support you in achieving everything you desire.",
  },
  {
    icon: Gift,
    title: "Special Moments",
    content:
      "I wish for us to create many more beautiful memories together. Every moment with you is precious and I cherish each one.",
  },
  {
    icon: Cake,
    title: "Celebration",
    content:
      "I wish you a day filled with laughter, surprises, and everything that brings a smile to your beautiful face.",
  },
  {
    icon: Sparkles,
    title: "Your Happiness",
    content: "Above all, I wish for your happiness. Your smile lights up my world and I want to see it every day.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WishList() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Birthday Wishes</h3>
        <p className="text-purple-300">My wishes for you on your special day</p>
      </div>

      <motion.div className="grid gap-4 md:grid-cols-2" variants={container} initial="hidden" animate="show">
        {wishes.map((wish, index) => (
          <motion.div key={index} variants={item}>
            <Card className="border-purple-700/50 bg-slate-900/60 h-full overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-800/50">
                      <wish.icon className="h-5 w-5 text-pink-400" />
                    </div>
                    <h4 className="text-lg font-semibold">{wish.title}</h4>
                  </div>
                  <p className="text-purple-200 flex-1">{wish.content}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8"
      >
        <p className="text-lg text-pink-300 font-medium">Happy Birthday to the most amazing person in my life! ❤️</p>
      </motion.div>
    </div>
  )
}

