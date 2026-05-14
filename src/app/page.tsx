'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';

const Decoration = ({ src, className, delay = 0, duration = 10, scale = 1, rotate = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 0.7,
      scale: scale,
      y: [0, -15, 0],
      rotate: [rotate, rotate + 10, rotate - 10, rotate]
    }}
    transition={{
      opacity: { duration: 1 },
      y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut", delay },
      scale: { duration: 1 }
    }}
    className={`absolute pointer-events-none z-0 ${className}`}
  >
    <Image src={src} alt="decoration" width={120} height={120} className="object-contain" />
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden bg-[#FDFBF7]">
      {/* Cluttered Floral Decorations */}
      <Decoration src={FLOWER_ASSETS.Rose} className="top-[5%] left-[10%]" delay={0} duration={12} scale={1.2} rotate={15} />
      <Decoration src={FLOWER_ASSETS.Peony} className="top-[15%] right-[8%]" delay={1} duration={15} scale={1.4} rotate={-10} />
      <Decoration src={FLOWER_ASSETS.Sunflower} className="bottom-[10%] left-[5%]" delay={2} duration={14} scale={1.1} rotate={20} />
      <Decoration src={FLOWER_ASSETS.Tulip} className="bottom-[15%] right-[12%]" delay={0.5} duration={11} scale={1.3} rotate={-5} />

      <Decoration src={GREENERY_ASSETS['greenery-1']} className="top-[40%] left-[-2%]" delay={3} duration={18} scale={1.8} rotate={45} />
      <Decoration src={GREENERY_ASSETS['greenery-2']} className="top-[60%] right-[-3%]" delay={1.5} duration={20} scale={2.0} rotate={-30} />

      <Decoration src={DECO_ASSETS['deco-white']} className="top-[25%] left-[30%]" delay={4} duration={8} scale={0.5} />
      <Decoration src={DECO_ASSETS['deco-white']} className="bottom-[35%] right-[25%]" delay={2.5} duration={9} scale={0.6} />
      <Decoration src={DECO_ASSETS['deco-white']} className="top-[70%] left-[20%]" delay={1} duration={10} scale={0.4} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-12">

        {/* Visual Centerpiece - A slightly messy stack */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto pointer-events-none drop-shadow-xl">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/assets/peony.webp"
              alt="peony flower"
              fill
              className="object-contain rotate-[-12deg] scale-110"
              priority
            />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/assets/rose.webp"
              alt="rose flower"
              fill
              className="object-contain rotate-[15deg] translate-x-4 translate-y-4"
              priority
            />
          </motion.div>
        </div>

        {/* Headings */}
        <div className="space-y-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-[#111827] italic"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            digibouquet
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#6B7280] font-mono text-sm md:text-base uppercase tracking-[0.3em]"
          >
            Organic Digital Floristry & Secret Messages
          </motion.p>
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center space-y-6 pt-8 w-full px-4"
        >
          <Link
            href="/build"
            className="group relative w-full md:w-auto overflow-hidden bg-[#111827] text-white px-12 py-5 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">Start an Arrangement</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/garden"
              className="font-mono text-xs uppercase tracking-widest text-[#6B7280] hover:text-[#111827] transition-colors border-b border-transparent hover:border-[#111827] pb-1"
            >
              Public Garden
            </Link>
            <Link
              href="/build?mode=bw"
              className="font-mono text-xs uppercase tracking-widest text-[#6B7280] hover:text-[#111827] transition-colors border-b border-transparent hover:border-[#111827] pb-1"
            >
              Noir Mode
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:px-12 mt-auto text-[10px] font-mono uppercase tracking-[0.2em] text-[#A1A1AA] z-20">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <span>Systems Active</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Vercel Edge</span>
        </div>
        <div className="flex space-x-8">
          <a href="https://github.com/nithinreddy18" target="_blank" rel="noopener noreferrer" className="hover:text-[#111827] transition-colors">
            @nithinreddy18
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
