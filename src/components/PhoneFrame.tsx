import React from 'react';
import { motion } from 'motion/react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center h-[100dvh] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black p-0 sm:p-4 overflow-hidden">
      {/* Ambient Background Elements - Desktop Only */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-spy-blue/20 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-spy-gold/20 to-transparent opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spy-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spy-gold/5 rounded-full blur-3xl" />
      </div>

      {/* The Phone Device */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full sm:w-[390px] sm:h-[844px] bg-[#1a1a1a] sm:rounded-[3rem] sm:border-[8px] sm:border-[#2a2a2a] sm:shadow-2xl overflow-hidden z-10 sm:ring-1 sm:ring-white/10"
      >
        {/* Dynamic Island / Notch Area - Desktop Only */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 items-center justify-center">
           <div className="w-16 h-4 bg-[#111] rounded-full flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0f0] shadow-[0_0_5px_#0f0]"></div>
              <div className="w-1 h-1 rounded-full bg-blue-500/50"></div>
           </div>
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-black text-white overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* Reflection/Gloss - Desktop Only */}
        <div className="hidden sm:block absolute inset-0 rounded-[2.5rem] pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
      </motion.div>

      {/* Desktop Context Text (Visible only on large screens) */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 max-w-xs">
        <h1 className="font-serif text-4xl text-spy-gold mb-4">작전명: 로열 리셉션</h1>
        <p className="font-mono text-sm text-gray-400 leading-relaxed">
          S.C.R.T 보안 채널 접속.<br/>
          위치: 영국, 런던 (지하 30m)<br/>
          위장 신분: 왕실 행사 기획국(BRCTP)<br/>
          상태: 언크라운드 추적 중
        </p>
      </div>
    </div>
  );
}
