"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

type Song = {
  title: string
  artist: string
  duration: number
  cover: string
  url: string // Add this line
}

const songs: Song[] = [
  {
    title: "Happy Birthday",
    artist: "Birthday Classics",
    duration: 210, // 3:30
    cover: "/assets/image3.jpeg",
    url: "/assets/audio1.mp3" // Add this line
  },
  {
    title: "Celebration",
    artist: "Party Mix",
    duration: 245, // 4:05
    cover: "/assets/image8.jpeg",
    url: "/assets/audio/audio2.mp3" // Add this line
  },
  {
    title: "Good Vibes",
    artist: "Summer Hits",
    duration: 198, // 3:18
    cover: "/assets/image7.jpeg",
    url: "/assets/audio/audio3.mp3" // Add this line
  },
  {
    title: "Special Day",
    artist: "Birthday Anthems",
    duration: 223, // 3:43
    cover: "/assets/image3.jpeg",
    url: "/assets/audio/audio1.mp3" // Add this line
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const song = songs[currentSong]

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.url)
    } else {
      audioRef.current.src = song.url
    }
  
    audioRef.current.load() // Ensure the new source is loaded
  
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [currentSong])
   // Add song.url to the dependency array

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    } else {
      audioRef.current?.play()
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime((prev) => {
            if (prev >= song.duration) {
              nextSong()
              return 0
            }
            return prev + 1
          })
        }
      }, 1000)
    }
    setIsPlaying(!isPlaying)
  }

  const prevSong = () => {
    setCurrentTime(0)
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
  }

  const nextSong = () => {
    setCurrentTime(0)
    setCurrentSong((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={currentSong}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img src={song.cover || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Music className="w-8 h-8 text-white/70" />
          </div>
        </div>

        <div className="flex-1">
          <motion.h3
            className="text-xl font-bold"
            key={`title-${currentSong}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {song.title}
          </motion.h3>
          <motion.p
            className="text-gray-400"
            key={`artist-${currentSong}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {song.artist}
          </motion.p>
        </div>
      </div>

      <div className="mb-4">
        <Slider value={[currentTime]} max={song.duration} step={1} onValueChange={handleTimeChange} className="my-4" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} className="w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={prevSong} className="text-white hover:bg-white/10">
            <SkipBack />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            className="bg-white text-black hover:bg-gray-200 rounded-full h-12 w-12"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSong} className="text-white hover:bg-white/10">
            <SkipForward />
          </Button>
        </div>
        <div className="w-[88px]"></div> {/* Spacer to balance the layout */}
      </div>
    </motion.div>
  )
}