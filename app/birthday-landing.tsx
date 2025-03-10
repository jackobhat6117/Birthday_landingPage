"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Moon, Sun } from "lucide-react"
import FloatingConfetti from "@/components/Uicompoenents/floatting-confetti"
import BirthdayCake from "@/components/Uicompoenents/birthday-cake"
import ImageCarousel from "@/components/Uicompoenents/image-crousal"
import WishCard from "@/components/Uicompoenents/wish-card"
import MusicPlayer from "@/components/pages/musci-player"
import confetti from "canvas-confetti"
// import MusicPlayer from "@/components/music-player"
// import ImageCarousel from "@/components/image-carousel"
// import WishCard from "@/components/wish-card"
// import FloatingConfetti from "@/components/floating-confetti"
// import BirthdayCake from "@/components/birthday-cake"

export default function BirthdayPage() {
  const [showSurprise, setShowSurprise] = useState(false)
  const { setTheme, theme } = useTheme()

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const triggerSurprise = () => {
    setShowSurprise(true)
    launchConfetti()
  }

  useEffect(() => {
    // Set dark theme on initial load
    setTheme("dark")
  }, [setTheme])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <FloatingConfetti />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Heart className="text-pink-500" />
            <span className="font-bold text-xl">Happy Birthday!</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rotate-12">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl"></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%]">
            <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              Happy Birthday!
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Wishing you a day filled with happiness and a year filled with joy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Button
                onClick={triggerSurprise}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg shadow-purple-500/20"
              >
                <Gift className="mr-2" /> Reveal Surprise
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-1"></div>
          </div>
        </div>
      </section>

      {/* 3D Cake Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Wish</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Blow out the candles on this interactive 3D cake and make a wish!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <BirthdayCake position={[0, -1, 0]} />
              <OrbitControls enableZoom={false} />
              <Environment preset="apartment" />
            </Canvas>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Best Moments</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A collection of our favorite memories together.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ImageCarousel />
          </motion.div>
        </div>
      </section>

      {/* Wish List Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Birthday Wishes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Special messages from your loved ones.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WishCard
              name="Sarah"
              message="Happy birthday to my favorite person! May your day be as special as you are."
              emoji="🎂"
              delay={0.1}
            />
            <WishCard
              name="Michael"
              message="Wishing you all the happiness in the world on your special day!"
              emoji="🎉"
              delay={0.2}
            />
            <WishCard
              name="Jessica"
              message="Another year older, another year wiser. Happy birthday, friend!"
              emoji="🎁"
              delay={0.3}
            />
            <WishCard
              name="David"
              message="May your birthday be the start of a year filled with good luck, good health, and much happiness."
              emoji="🥂"
              delay={0.4}
            />
            <WishCard
              name="Emma"
              message="Sending you warm wishes on your birthday. Have a fantastic day!"
              emoji="🎈"
              delay={0.5}
            />
            <WishCard
              name="John"
              message="Happy birthday! May all your dreams and wishes come true."
              emoji="✨"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Birthday Playlist</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A selection of songs to celebrate your special day.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <MusicPlayer />
          </motion.div>
        </div>
      </section>

      {/* Surprise Modal */}
      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowSurprise(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-2xl max-w-lg w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500 via-transparent to-transparent blur-xl"></div>
              </div>

              <div className="relative z-10">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                </motion.div>

                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold mb-4"
                >
                  A Special Message For You
                </motion.h3>

                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 text-gray-200"
                >
                  On this special day, I want you to know how much you mean to me. Your kindness, your smile, and your
                  friendship make every day brighter. May this year bring you all the happiness you deserve.
                </motion.p>

                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                  <Button onClick={() => setShowSurprise(false)} className="bg-white text-pink-900 hover:bg-gray-200">
                    Close
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Made with <Heart className="inline-block w-4 h-4 text-pink-500" /> for your special day
          </p>
        </div>
      </footer>
    </div>
  )
}

