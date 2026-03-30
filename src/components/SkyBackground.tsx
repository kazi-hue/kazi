import React from 'react';
import { motion } from 'motion/react';

const Bird = ({ delay, top, duration, scale, opacity = 0.6 }: { delay: number, top: string, duration: number, scale: number, opacity?: number }) => {
  // Randomize the flap speed slightly so they don't flap in perfect unison
  const flapDuration = 0.4 + Math.random() * 0.2;
  
  return (
    <motion.div
      className="absolute left-0 z-10"
      style={{ top, scale, opacity }}
      initial={{ x: '-10vw', y: 0 }}
      animate={{ 
        x: '110vw', 
        y: [0, -30, 15, -15, 0] 
      }}
      transition={{ 
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration: duration / 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          stroke="#4a3b32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ 
            d: [
              "M 2 12 Q 7 6 12 12 Q 17 6 22 12", 
              "M 2 12 Q 7 16 12 12 Q 17 16 22 12"
            ] 
          }}
          transition={{ 
            duration: flapDuration, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
      </svg>
    </motion.div>
  );
};

const Cloud = ({ delay, top, duration, scale, opacity }: { delay: number, top: string, duration: number, scale: number, opacity: number }) => (
  <motion.div
    className="absolute left-0 z-0"
    style={{ top, scale, opacity }}
    initial={{ x: '-20vw' }}
    animate={{ x: '120vw' }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
  >
    <svg width="100" height="40" viewBox="0 0 100 40" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20C20 14.4772 24.4772 10 30 10C31.4706 10 32.8668 10.317 34.1166 10.8834C36.6347 4.70031 42.7102 0 50 0C58.2843 0 65 6.71573 65 15C65 15.2256 64.995 15.4499 64.9852 15.6727C66.5262 15.238 68.2162 15 70 15C78.2843 15 85 21.7157 85 30C85 38.2843 78.2843 45 70 45H30C13.4315 45 0 31.5685 0 15C0 9.47715 4.47715 5 10 5C13.5615 5 16.6896 6.85541 18.4616 9.66436C18.9515 9.77884 19.466 9.85694 20 9.90483V20Z" />
    </svg>
  </motion.div>
);

export default function SkyBackground() {
  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #7198c9 0%, #aebcd0 25%, #e3bba9 50%, #f2d3ab 75%, #fcf2ce 100%)'
      }}
    >
      {/* Cinematic Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-20" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      ></div>

      {/* Sun Glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-white/40 blur-[120px] rounded-t-full z-0"></div>
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] bg-[#ffd700]/20 blur-[100px] rounded-t-full z-0"></div>

      {/* Minimal Clouds */}
      <Cloud delay={0} top="15%" duration={140} scale={1.5} opacity={0.2} />
      <Cloud delay={30} top="25%" duration={180} scale={1} opacity={0.15} />
      <Cloud delay={70} top="10%" duration={200} scale={2} opacity={0.1} />
      <Cloud delay={100} top="35%" duration={160} scale={1.2} opacity={0.18} />
      <Cloud delay={10} top="45%" duration={220} scale={0.8} opacity={0.12} />
      
      {/* Birds - Flock 1 (Foreground) */}
      <Bird delay={0} top="20%" duration={35} scale={0.8} opacity={0.7} />
      <Bird delay={0.5} top="22%" duration={35} scale={0.7} opacity={0.7} />
      <Bird delay={1} top="18%" duration={35} scale={0.75} opacity={0.7} />
      <Bird delay={0.8} top="24%" duration={35} scale={0.65} opacity={0.7} />
      <Bird delay={1.5} top="19%" duration={35} scale={0.7} opacity={0.7} />
      
      {/* Birds - Flock 2 (Midground) */}
      <Bird delay={15} top="30%" duration={50} scale={0.5} opacity={0.5} />
      <Bird delay={15.8} top="32%" duration={50} scale={0.45} opacity={0.5} />
      <Bird delay={16.5} top="29%" duration={50} scale={0.48} opacity={0.5} />
      <Bird delay={17} top="31%" duration={50} scale={0.42} opacity={0.5} />
      
      {/* Birds - Flock 3 (Background) */}
      <Bird delay={35} top="15%" duration={70} scale={0.3} opacity={0.3} />
      <Bird delay={36} top="16%" duration={70} scale={0.25} opacity={0.3} />
      <Bird delay={37} top="14%" duration={70} scale={0.28} opacity={0.3} />
    </div>
  );
}
