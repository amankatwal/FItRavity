"use client";

import { motion } from "motion/react";
import { Guitar, Zap } from "lucide-react";
import Logo from "@/public/logo.png"
import Image from "next/image";
export default function HomeLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-card">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: 1.2
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >

          <Image src={Logo} alt="logo" className="w-52 h-52"/>
        </motion.div>
        <div className="mt-8 flex items-center gap-1">
          <span className="text-xl font-bold tracking-[6px] text-card-foreground">
            Loading
          </span>

          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -7, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
              className="text-2xl font-bold text-primary"
            >
              .
            </motion.span>
          ))}
        </div>
        <div className="mt-5 h-[3px] w-52 overflow-hidden rounded-full bg-card-foreground/10">
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "40%" }}
          />
        </div>
      </div>
    </div>
  );
}