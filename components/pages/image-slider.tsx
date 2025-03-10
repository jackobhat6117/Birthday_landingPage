"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample images - replace with your actual images
const images = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Happy moments together",
    caption: "Our favorite day at the beach",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Birthday celebration",
    caption: "Last year's birthday celebration",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Special date",
    caption: "Our special dinner date",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Fun memories",
    caption: "Creating memories together",
  },
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-lg font-medium">{images[currentIndex].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 border-0 text-white hover:bg-black/50"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 border-0 text-white hover:bg-black/50"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => {
              setIsAutoPlaying(false)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

