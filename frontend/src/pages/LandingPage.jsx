import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button, Footer } from "../index.js";

import { AuroraBackground } from "../components/ui/aurora-background.jsx";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards.jsx";

export default function HeroSectionOne() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center justify-center bg-black">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20 bg-black mt-16">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Simplify Your Parts Management with NEXAR"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Nexar is your smart inventory system to organize, track, and manage
          every part — with precision, clarity, and speed.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button onClick={() => navigate("/auth/signup")} text="Explore Now" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className=" relative w-[60rem] z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 mx-auto ">
            <video
              src="/assets/video/hero02.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover"
            ></video>
          </div>
        </motion.div>
      </div>
      <div className="w-full ">
        <InfiniteMovingCardsDemo />
      </div>
      <div className="w-11/12 bg-slate-50 relative rounded-3xl overflow-hidden">
        <AuroraBackgroundDemo />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative w-full flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="pt-10 text-3xl md:text-7xl font-bold dark:text-white text-center">
          Precision in Shelving, Power in Searching.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Smart Inventory Starts Here.
        </div>
        <Button text="Free Trial" />
      </motion.div>
    </AuroraBackground>
  );
}

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "With Nexar, tracking parts is no longer a hassle. It's like having a smart assistant in your warehouse.",
    name: "Rajesh Patel",
    title: "Warehouse Manager, Omega Components",
  },
  {
    quote:
      "We cut down inventory errors by over 60% within the first month of using Nexar. It’s a total game-changer.",
    name: "Neha Singh",
    title: "COO, Vertex Auto Parts",
  },
  {
    quote:
      "From shelving to searching, Nexar makes every step seamless. Our operations have never been smoother.",
    name: "Aditya Mehra",
    title: "Operations Head, SteelByte Solutions",
  },
  {
    quote:
      "Managing hundreds of SKUs used to be chaos. Now, with Nexar, it's all under control and super easy to scale.",
    name: "Pooja Rani",
    title: "Inventory Lead, MechaTools Pvt. Ltd.",
  },
  {
    quote:
      "Nexar’s interface is clean, fast, and intuitive. Even new staff can navigate the system in minutes.",
    name: "Vikram Chauhan",
    title: "Founder, BuildPro Engineering",
  },
];
