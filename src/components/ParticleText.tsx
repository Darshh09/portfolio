import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticleText() {
  const [isFormed, setIsFormed] = useState(false);
  const [showText, setShowText] = useState(false);

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    // Simulate particle formation timing
    const timer = setTimeout(() => {
      setIsFormed(true);
      setTimeout(() => setShowText(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Deep space background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black">
        {/* Animated stars */}
        {Array.from({ length: 100 }, (_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebula clouds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle System */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "transparent"
          },
          fullScreen: { enable: false },
          particles: {
            number: {
              value: 0,
              limit: 500
            },
            shape: {
              type: "circle"
            },
            color: {
              value: ["#60a5fa", "#8b5cf6", "#06b6d4", "#3b82f6", "#a855f7"]
            },
            size: {
              value: { min: 2, max: 8 },
              animation: {
                enable: true,
                speed: 3,
                sync: false,
                minimumValue: 0.1
              }
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce"
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 1,
                sync: false
              }
            },
            life: {
              duration: {
                sync: false,
                value: 20
              },
              count: 1
            },
            glow: {
              distance: 50,
              color: {
                value: "#60a5fa"
              }
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              },
              onClick: {
                enable: true,
                mode: "push"
              }
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              }
            }
          },
          emitters: [
            {
              direction: "none",
              rate: {
                quantity: 10,
                delay: 0.1
              },
              size: {
                width: 100,
                height: 100
              },
              position: {
                x: 50,
                y: 50
              },
              spawnColor: {
                value: "#60a5fa"
              }
            }
          ],
          detectRetina: true
        }}
      />

      {/* Text Mask Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          {/* Glowing text outline */}
          <motion.div
            className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(0,255,255,0.8)] whitespace-nowrap"
            animate={{
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Darshit Shukla
          </motion.div>

          {/* Main text that appears after particles form */}
          <AnimatePresence>
            {showText && (
              <motion.div
                className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                Darshit Shukla
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle formation indicator */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-cyan-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFormed ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              FORMING...
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Sci-fi coding effects */}
      <div className="absolute top-4 left-4 text-xs text-green-400 font-mono opacity-60">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INITIALIZING PARTICLE SYSTEM...
        </motion.div>
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          LOADING TYPOGRAPHY MASK...
        </motion.div>
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          RENDERING COSMIC EFFECTS...
        </motion.div>
      </div>
    </div>
  );
}
