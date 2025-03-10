"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "./confett";
import ImageSlider from "./image-slider";
import MusicPlayer from "./musci-player";
import WishList from "./wish-list";
import { ChevronDown } from "./chevron-down";
import InfiniteMenu from "../infinite-menu";
import { items } from "@/lib/infnite-scroll";

export default function BirthdayLanding() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {showConfetti && <Confetti />}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <Sparkles className="h-16 w-16 text-pink-400 mx-auto" />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div>
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Happy Birthday!
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-purple-200 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                To the most amazing person in my life
              </motion.p>
            </div>

            {/* <div className="w-full md:w-96 h-96">
              <InfiniteMenu items={items} />
            </div> */}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              Explore Your Gift
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <ChevronDown className="w-10 h-10 text-pink-500" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500 opacity-20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Special Day</h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            A collection of memories, wishes, and songs just for you on your birthday
          </p>
        </motion.div>

        <div className="w-full max-w-4xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-purple-800 bg-slate-900/60 backdrop-blur-sm">
              <CardContent className="pt-6">
                <ImageSlider />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-purple-800 bg-slate-900/60 backdrop-blur-sm">
              <CardContent className="pt-6">
                <MusicPlayer />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-purple-800 bg-slate-900/60 backdrop-blur-sm">
              <CardContent className="pt-6">
                <WishList />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final Message */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="border-pink-700 bg-gradient-to-br from-slate-900 to-purple-900/80 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-pink-500 opacity-10"
                  style={{
                    width: Math.random() * 100 + 20,
                    height: Math.random() * 100 + 20,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
            <CardContent className="pt-6 p-8 relative z-10">
              <Gift className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">My Gift To You</h3>
              <p className="text-purple-100 mb-6">
                On this special day, I want you to know how much you mean to me. Your smile brightens my day, and your
                love fills my heart with joy. May this year bring you all the happiness you deserve.
              </p>
              <p className="text-xl font-medium text-pink-300">With all my love ❤️</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-purple-900/30 text-center text-sm text-purple-300">
        <p>Made with ❤️ just for you | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}