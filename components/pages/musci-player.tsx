"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"

const songs = [
  {
    id: 1,
    title: "Happy Birthday Song",
    artist: "Special Artist",
    cover: "/assets/image8.jpeg",
    url: "/assets/audio/audio1.mp3",
    color: "from-pink-500 to-purple-600",
  },
  {
    id: 2,
    title: "Our Special Song",
    artist: "Favorite Artist",
    cover: "/assets/image21.jpeg",
    url: "/assets/audio/audio2.mp3",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 4,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image2.jpeg",
    url: "/assets/audio/audio3.mp3",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 5,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image3.jpeg",
    url: "/assets/audio/audio4.mp3",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 6,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image23.jpeg",
    url: "/assets/audio/audio5.mp3",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 7,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image19.jpeg",
    url: "/assets/audio/audio6.mp3",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 8,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image11.jpeg",
    url: "/assets/audio/audio7.mp3",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 9,
    title: "Memories",
    artist: "Love Songs",
    cover: "/assets/image17.jpeg",
    url: "/assets/audio/audio8.mp3",
    color: "from-blue-500 to-purple-600",
  },
]

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // ✅ Disable autoplay initially
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ✅ Preload Audio on Mount
  useEffect(() => {
    const audio = new Audio(songs[currentSongIndex].url)
    audio.preload = "metadata"
    audioRef.current = audio
  }, [])

  // ✅ Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.src = songs[currentSongIndex].url
      audio.play().catch((err) => console.error("Playback error:", err))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSongIndex])

  // ✅ Update Progress and Duration
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev) // ✅ Toggle play/pause
  }

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
  }

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length)
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
    }
    setProgress(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="space-y-6">
      <audio ref={audioRef} />

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Music For You</h3>
        {/* <p className="text-purple-300">Some special songs that remind me of you</p> */}
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-purple-900/40 rounded-xl p-6 border border-purple-700/50">
          <div className="flex flex-col items-center">
            <motion.div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-xl mb-6">
              <img
                src={songs[currentSongIndex].cover}
                alt={songs[currentSongIndex].title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="text-center mb-4 w-full">
              <h3 className="text-xl font-bold text-white truncate">{songs[currentSongIndex].title}</h3>
              <p className="text-purple-300 truncate">{songs[currentSongIndex].artist}</p>
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Slider
                  value={[progress]}
                  max={duration}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-purple-300">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-purple-300 hover:text-white hover:bg-purple-800/30"
                >
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevious}
                    className="text-purple-300 hover:text-white hover:bg-purple-800/30"
                  >
                    <SkipBack />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handlePlayPause}
                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full h-12 w-12"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="text-purple-300 hover:text-white hover:bg-purple-800/30"
                  >
                    <SkipForward />
                  </Button>
                </div>

                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-purple-900/40 rounded-xl border border-purple-700/50 overflow-hidden">
          <div className="p-4 border-b border-purple-800/30 flex items-center">
            <Music className="h-5 w-5 text-pink-400 mr-2" />
            <h3 className="font-semibold">Music Collection</h3>
          </div>

          <ScrollArea className="h-[400px] p-4">
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => setCurrentSongIndex(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentSongIndex === index ? "bg-purple-900/50 shadow-lg" : "hover:bg-purple-900/30"
                }`}
              >
                {song.title} - {song.artist}
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}