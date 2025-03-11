"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  {
    src: "/assets/image4.jpeg",
    alt: "Birthday celebration",
    caption: "Last year's birthday party",
  },
  {
    src: "/assets/image2.jpeg",
    alt: "Friends gathering",
    caption: "Weekend trip with friends",
  },
  {
    src: "/assets/image3.jpeg",
    alt: "Special moment",
    caption: "That special day we'll never forget",
  },
  {
    src: "/assets/image5.jpeg",
    alt: "Fun times",
    caption: "Just having fun together",
  },
  {
    src: "/assets/image6.jpeg",
    alt: "Birthday celebration",
    caption: "Last year's birthday party",
  },
  {
    src: "/assets/image7.jpeg",
    alt: "Friends gathering",
    caption: "Weekend trip with friends",
  },
  {
    src: "/assets/image8.jpeg",
    alt: "Special moment",
    caption: "That special day we'll never forget",
  },
  {
    src: "/assets/image9.jpeg",
    alt: "Fun times",
    caption: "Just having fun together",
  },
  {
    src: "/assets/image23.jpeg",
    alt: "Birthday celebration",
    caption: "Last year's birthday party",
  },
  {
    src: "/assets/image22.jpeg",
    alt: "Friends gathering",
    caption: "Weekend trip with friends",
  },
  {
    src: "/assets/image15.jpeg",
    alt: "Special moment",
    caption: "That special day we'll never forget",
  },
  {
    src: "/assets/image15.jpeg",
    alt: "Fun times",
    caption: "Just having fun together",
  },
]

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
      <div className="aspect-[16/9] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill // Fills the parent container
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
              priority={current === 0} // Prioritize loading the first image
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-xl font-medium"
              >
                {images[current].caption}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
      >
        <ChevronLeft />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
      >
        <ChevronRight />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-4" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}